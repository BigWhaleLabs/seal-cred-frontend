import {
  ProofStatus,
  checkJobStatus,
  scheduleProofGeneration,
} from 'helpers/callProof'
import { handleError } from 'helpers/handleError'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import ProofResponse from 'models/ProofResponse'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'
import createEcdsaInput from 'helpers/createEcdsaInput'
import createTreeProof from 'helpers/createTreeProof'
import getMapOfOwners from 'helpers/getMapOfOwners'
import isAddressOwner from 'helpers/isAddressOwner'

type Proof = {
  id: string
  contract: string
  account: string
  status: ProofStatus
  position?: number
  proof?: ProofResponse
}

class ProofStore extends PersistableStore {
  proofsInProgress: { [badge: string]: Proof } = {}
  proofsReady: Proof[] = []

  async generate(contract: string) {
    try {
      const account = WalletStore.account
      if (!account) throw new Error('No account found')

      const ledger = await StreetCredStore.ledger
      const record = ledger[contract]

      if (!record || !record.originalContract)
        throw new Error('Derivative contract not found')

      const { originalContract } = record

      const isOwner = isAddressOwner(originalContract, account)
      if (!isOwner) throw new Error('Account is not owner of contract')

      const owners = await getMapOfOwners(originalContract)
      const addresses = Array.from(owners.values())

      const tokenId = addresses.indexOf(account)
      if (tokenId < 0) throw new Error('Account is not owner of contract')

      const signature = await WalletStore.signMessage(contract)
      if (!signature) throw new Error('Signature is not found')

      const treeProof = createTreeProof(tokenId, addresses)
      const ecdsaInput = createEcdsaInput(signature)
      const result = await scheduleProofGeneration(treeProof, ecdsaInput)

      this.proofsInProgress[contract] = {
        id: result._id,
        status: result.status,
        proof: result.proof,
        account,
        contract,
      }

      return result
    } catch (e) {
      handleError(new Error('Proof generation failed'))
      return
    }
  }

  checkTasks() {
    return Promise.all(
      Object.values(this.proofsInProgress).map(async (proof) => {
        try {
          const { position, job } = await checkJobStatus(proof.id)

          if (
            [ProofStatus.scheduled, ProofStatus.running].includes(job.status)
          ) {
            this.proofsInProgress[proof.contract].position = position
            return
          }

          if (job.status === ProofStatus.completed) {
            this.proofsReady.push(this.proofsInProgress[proof.contract])
          }

          delete this.proofsInProgress[proof.contract]

          if (job.status === ProofStatus.cancelled)
            handleError(new Error('Proof generation cancelled'))

          if (job.status === ProofStatus.failed)
            handleError(new Error('Proof generation failed'))
        } catch (e) {
          handleError(new Error('Proof generation failed'))
          console.log('Error: ', e)
          return
        }
      })
    )
  }
}

const proofStore = proxy(new ProofStore()).makePersistent(true)

setInterval(async () => {
  await proofStore.checkTasks()
}, 5000)

export default proofStore
