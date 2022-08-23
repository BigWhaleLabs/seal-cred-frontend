import { BadgeSourceType } from 'data'
import { PersistableStore } from '@big-whale-labs/stores'
import {
  getEddsaPublicKey,
  requestAddressOwnershipAttestation,
  requestBalanceAttestation,
} from 'helpers/proofs/attestor'
import { proxy } from 'valtio'
import BaseProof from 'helpers/proofs/BaseProof'
import ERC721Proof, { ERC721ProofSchema } from 'helpers/proofs/ERC721Proof'
import EmailProof, { EmailProofSchema } from 'helpers/proofs/EmailProof'
import Network from 'models/Network'
import ProofResult from 'models/ProofResult'
import WalletStore from 'stores/WalletStore'
import checkNavigator from 'helpers/proofs/checkNavigator'
import dataShapeObject from 'helpers/contracts/dataShapeObject'
import getNullifierMessage from 'helpers/proofs/getNullifierMessage'
import handleError from 'helpers/handleError'

class ProofStore extends PersistableStore {
  proofsCompleted: BaseProof[] = []

  deleteProof(proof: BaseProof) {
    this.proofsCompleted = this.proofsCompleted.filter((p) => !proof.equal(p))
  }

  reviver = (key: string, value: unknown) => {
    if (key === 'proofsCompleted') {
      return value as { type: string; result?: ProofResult }[]
    }
    return value
  }
}

class EmailProofStore extends ProofStore {
  reviver = (key: string, value: unknown) => {
    if (key === 'proofsCompleted') {
      return (
        value as ({
          type: string
          result?: ProofResult
        } & EmailProofSchema)[]
      ).map(EmailProof.fromJSON)
    }
    return value
  }
}

class ERC721ProofStore extends ProofStore {
  reviver = (key: string, value: unknown) => {
    if (key === 'proofsCompleted') {
      return (
        value as ({
          type: string
          result?: ProofResult
        } & ERC721ProofSchema)[]
      ).map(ERC721Proof.fromJSON)
    }
    return value
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
    const newEmailProof = new EmailProof(domain)
    await newEmailProof.build(signature, eddsaPublicKey)
    store.proofsCompleted.push(newEmailProof)
    return newEmailProof
  } catch (e) {
    handleError(e)
  }
}

export async function generateERC721(
  store: ProofStore,
  contract: string,
  network: Network
) {
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
    // Get balance EdDSA attestation
    const balanceSignature = await requestBalanceAttestation(
      contract,
      network,
      account
    )
    // Get the proof
    const newERC721Proof = new ERC721Proof(contract, account, network)
    checkNavigator()
    await newERC721Proof.build(
      ownershipSignature,
      balanceSignature,
      eddsaPublicKey
    )
    store.proofsCompleted.push(newERC721Proof)
    return newERC721Proof
  } catch (e) {
    handleError(e)
  }
}

function createProofStore(type: BadgeSourceType) {
  switch (type) {
    case BadgeSourceType.ERC721:
      return new ERC721ProofStore()
    case BadgeSourceType.Email:
      return new EmailProofStore()
    default:
      return new ProofStore()
  }
}

export default proxy(
  dataShapeObject((_, { badgeType }) => createProofStore(badgeType))
)
