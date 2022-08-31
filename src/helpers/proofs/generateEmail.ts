import { BadgeSourceType } from 'data'
import { DataKey } from 'models/DataKey'
import { ProofStore } from 'stores/ProofStore'
import { getEddsaPublicKey } from 'helpers/proofs/attestor'
import buildEmailProof from 'helpers/proofs/buildEmailProof'
import checkNavigator from 'helpers/proofs/checkNavigator'
import handleError from 'helpers/handleError'

export default async function generateEmail(
  store: ProofStore,
  original: string,
  options: {
    secret?: string
  }
) {
  if (!options.secret) throw new Error('Signature not found!')
  try {
    const eddsaPublicKey = await getEddsaPublicKey()
    checkNavigator()
    const result = await buildEmailProof(
      original,
      options.secret,
      eddsaPublicKey
    )
    const proof = {
      original,
      dataType: 'Email' as DataKey,
      badgeType: BadgeSourceType.Email,
      result,
    }
    store.proofsCompleted.push(proof)
    return proof
  } catch (e) {
    handleError(e)
  }
}
