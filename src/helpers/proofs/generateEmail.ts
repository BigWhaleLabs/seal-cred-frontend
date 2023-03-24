import { BadgeSourceType } from 'data'
import { DataKey } from 'models/DataKey'
import { ProofStore } from 'stores/ProofStore'
import { getEddsaPublicKey } from 'helpers/proofs/attestor'
import { handleError } from '@big-whale-labs/frontend-utils'
import buildEmailProof from 'helpers/proofs/buildEmailProof'
import checkNavigator from 'helpers/proofs/checkNavigator'

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
      badgeType: BadgeSourceType.Email,
      dataType: 'Email' as DataKey,
      original,
      result,
    }
    store.proofsCompleted.push(proof)
    return proof
  } catch (e) {
    handleError(e)
  }
}
