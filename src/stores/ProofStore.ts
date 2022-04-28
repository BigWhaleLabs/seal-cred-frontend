import { checkJobStatus, scheduleProofGeneration } from 'helpers/callProof'
import { e } from 'poseidon/scalar_bigint'
import { handleError } from 'helpers/handleError'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import Proof from 'models/Proof'
import ProofStatus from 'models/ProofStatus'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'
import createEcdsaInput from 'helpers/createEcdsaInput'
import createTreeProof from 'helpers/createTreeProof'
import getMapOfOwners from 'helpers/getMapOfOwners'
import isAddressOwner from 'helpers/isAddressOwner'

class ProofStore extends PersistableStore {
  proofsInProgress: Proof[] = []
  proofsCompleted: Proof[] = []

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

      this.proofsInProgress.push({
        id: result._id,
        status: result.status,
        proof: result.proof,
        account,
        contract,
      })
    } catch (e) {
      handleError(new Error('Scheduling the proof generation failed'))
    }
  }

  checkTasks() {
    return Promise.all(
      this.proofsInProgress.map(async (proof) => {
        try {
          const { position, job } = await checkJobStatus(proof.id)
          proof.status = job.status
          proof.position = position

          if (proof.status === ProofStatus.completed) {
            proof.proof = job.proof
            if (!proof.proof) {
              throw new Error('Proof is completed but no proof is found')
            }
            this.proofsCompleted.push(proof)
            const index = this.proofsInProgress.indexOf(proof)
            if (index > -1) {
              this.proofsInProgress.splice(index, 1)
            }
          }

          if (
            proof.status === ProofStatus.cancelled ||
            proof.status === ProofStatus.failed
          ) {
            const index = this.proofsInProgress.indexOf(proof)
            if (index > -1) {
              this.proofsInProgress.splice(index, 1)
            }
            handleError(new Error('Proof generation failed'))
          }
        } catch (e) {
          handleError(new Error('Checking proof status failed'))
        }
      })
    )
  }
}

const proofStore = proxy(new ProofStore()).makePersistent(true)

let checking = false
setInterval(async () => {
  if (checking) return
  checking = true
  try {
    await proofStore.checkTasks()
  } finally {
    checking = false
  }
}, 5 * 1000)

export default proofStore
