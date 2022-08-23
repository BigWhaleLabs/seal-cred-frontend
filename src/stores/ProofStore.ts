import { ContractReceipt } from 'ethers'
import { DataKeys } from 'models/DataKeys'
import { PersistableStore } from '@big-whale-labs/stores'
import {
  getEddsaPublicKey,
  requestAddressOwnershipAttestation,
  requestBalanceAttestation,
  requestContractMetadata,
} from 'helpers/proofs/attestor'
import { proxy } from 'valtio'
import BaseProof from 'helpers/proofs/BaseProof'
import Network from 'models/Network'
import ProofResult from 'models/ProofResult'
import WalletStore from 'stores/WalletStore'
import buildERC721Proof from 'helpers/proofs/buildERC721Proof'
import buildEmailProof from 'helpers/proofs/buildEmailProof'
import checkNavigator from 'helpers/proofs/checkNavigator'
import createERC721Badge from 'helpers/contracts/createERC721Badge'
import createEmailBadge from 'helpers/contracts/createEmailBadge'
import createExternalERC721Badge from 'helpers/contracts/createExternalERC721Badge'
import data, { BadgeSourceType } from 'data'
import dataShapeObject from 'helpers/contracts/dataShapeObject'
import getNullifierMessage from 'helpers/proofs/getNullifierMessage'
import handleError from 'helpers/handleError'

abstract class ProofStore extends PersistableStore {
  proofsCompleted: BaseProof[] = []
  dataKey: DataKeys

  constructor(dataKey: DataKeys) {
    super()
    this.dataKey = dataKey
  }

  deleteProof(proof: BaseProof) {
    this.proofsCompleted = this.proofsCompleted.filter((p) => !proof.equal(p))
  }

  reviver = (key: string, value: unknown) => {
    if (key === 'proofsCompleted') {
      return (
        value as {
          origin: string
          result: ProofResult
          dataType: DataKeys
          account?: string
        }[]
      ).map(BaseProof.fromJSON)
    }
    return value
  }

  abstract mint(proof: BaseProof): Promise<ContractReceipt>
}

class EmailProofStore extends ProofStore {
  async mint(proof: BaseProof) {
    try {
      const provider = await WalletStore.createGSNProvider()
      const result = await createEmailBadge(provider, proof)
      this.deleteProof(proof)
      return result
    } catch (error) {
      handleError(error)
      throw error
    }
  }
}

class ERC721ProofStore extends ProofStore {
  network: Network

  constructor(dataKey: DataKeys, network: Network) {
    super(dataKey)
    this.network = network
  }

  async mint(proof: BaseProof) {
    try {
      let result: ContractReceipt
      const provider = await WalletStore.createGSNProvider()
      if (this.network === Network.Goerli) {
        result = await createERC721Badge(provider, proof)
      } else {
        const signature = await requestContractMetadata(
          this.network,
          proof.origin
        )
        result = await createExternalERC721Badge(
          provider,
          proof,
          signature.message,
          signature.signature
        )
      }

      this.deleteProof(proof)

      return result
    } catch (error) {
      handleError(error)
      throw error
    }
  }
}

export async function generateEmail(
  store: ProofStore,
  domain: string,
  signature: string
) {
  try {
    // Get public key
    const eddsaPublicKey = await getEddsaPublicKey()
    // Check navigator availability
    checkNavigator()
    // Create proof
    const result = await buildEmailProof(domain, signature, eddsaPublicKey)
    const proof = new BaseProof(domain, 'Email', result)
    store.proofsCompleted.push(proof)
    return proof
  } catch (e) {
    handleError(e)
  }
}

export async function generateERC721(store: ProofStore, contract: string) {
  try {
    // Get the account
    const account = WalletStore.account
    if (!account) {
      throw new Error('No account selected')
    }
    // Get public key
    const eddsaPublicKey = await getEddsaPublicKey()
    // Get nullifier signature
    const nullifierMessage = getNullifierMessage()
    const nullifierSignature = await WalletStore.signMessage(nullifierMessage)
    // Get ownership EdDSA attestation
    const ownershipSignature = await requestAddressOwnershipAttestation(
      nullifierSignature,
      nullifierMessage
    )
    const network = data[store.dataKey].network
    // Get balance EdDSA attestation
    const balanceSignature = await requestBalanceAttestation(
      contract,
      network,
      account
    )
    // Get the proof
    const result = await buildERC721Proof(
      ownershipSignature,
      balanceSignature,
      eddsaPublicKey
    )
    const proof = new BaseProof(contract, store.dataKey, result, account)
    checkNavigator()
    store.proofsCompleted.push(proof)
    return proof
  } catch (e) {
    handleError(e)
  }
}

function createProofStore(
  dataKey: DataKeys,
  type: BadgeSourceType,
  network: Network
) {
  switch (type) {
    case BadgeSourceType.ERC721:
      return new ERC721ProofStore(dataKey, network)
    case BadgeSourceType.Email:
      return new EmailProofStore(dataKey)
  }
}

export default proxy(
  dataShapeObject((dataKey, { badgeType, network }) =>
    createProofStore(dataKey, badgeType, network)
  )
)
