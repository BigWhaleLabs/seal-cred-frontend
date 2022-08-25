import { DataKey } from 'models/DataKey'
import { ProofStore } from 'stores/ProofStore'
import { getEddsaPublicKey } from 'helpers/proofs/attestor'
import buildEmailProof from 'helpers/proofs/buildEmailProof'
import checkNavigator from 'helpers/proofs/checkNavigator'
import handleError from 'helpers/handleError'

export default async function generateEmail(
  store: ProofStore,
  original: string,
  signature: string
) {
  try {
    const eddsaPublicKey = await getEddsaPublicKey()
    checkNavigator()
    const result = await buildEmailProof(original, signature, eddsaPublicKey)
    const proof = {
      original,
      dataType: 'Email' as DataKey,
      result,
    }
    store.proofsCompleted.push(proof)
    return proof
  } catch (e) {
    handleError(e)
  }
}
