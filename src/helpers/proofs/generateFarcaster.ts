import { BadgeSourceType } from 'data'
import { ProofStore } from 'stores/ProofStore'
import {
  getEddsaPublicKey,
  requestAddressOwnershipAttestation,
  requestFarcasterAttestation,
} from 'helpers/proofs/attestor'
import { handleError } from '@big-whale-labs/frontend-utils'
import buildFarcasterProof from 'helpers/proofs/buildFarcasterProof'
import checkNavigator from 'helpers/proofs/checkNavigator'
import getNullifierMessage from 'helpers/proofs/getNullifierMessage'
import walletStore from 'stores/WalletStore'

export default async function generateERC721(
  store: ProofStore,
  original: string,
  options: {
    username?: string
  }
) {
  if (!options.username) throw new Error('Username not found!')
  try {
    const account = walletStore.account
    if (!account) throw new Error('No account selected')
    const farcasterSignature = await requestFarcasterAttestation(
      options.username,
      account
    )
    const eddsaPublicKey = await getEddsaPublicKey()
    const nullifierMessage = getNullifierMessage()
    const nullifierSignature = await walletStore.signMessage(nullifierMessage)
    const ownershipSignature = await requestAddressOwnershipAttestation(
      nullifierSignature,
      nullifierMessage
    )
    const result = await buildFarcasterProof(
      eddsaPublicKey,
      ownershipSignature,
      farcasterSignature
    )
    const proof = {
      original,
      result,
      account,
      dataType: store.dataKey,
      badgeType: BadgeSourceType.Farcaster,
    }
    checkNavigator()
    store.proofsCompleted.push(proof)
    return proof
  } catch (e) {
    handleError(e)
  }
}
