import { DataKeys } from 'models/DataKeys'
import { ProofStore } from 'stores/ProofStore'
import { getEddsaPublicKey } from 'helpers/proofs/attestor'
import buildEmailProof from 'helpers/proofs/buildEmailProof'
import checkNavigator from 'helpers/proofs/checkNavigator'
import handleError from 'helpers/handleError'

export default async function generateEmail(
  store: ProofStore,
  origin: string,
  signature: string
) {
  try {
    // Get public key
    const eddsaPublicKey = await getEddsaPublicKey()
    // Check navigator availability
    checkNavigator()
    // Create proof
    const result = await buildEmailProof(origin, signature, eddsaPublicKey)
    const proof = {
      origin,
      dataType: 'Email' as DataKeys,
      result,
    }
    store.proofsCompleted.push(proof)
    return proof
  } catch (e) {
    handleError(e)
  }
}
