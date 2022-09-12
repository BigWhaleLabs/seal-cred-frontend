import { BadgeSourceType } from 'data'
import { ProofStore } from 'stores/ProofStore'
import {
  getEddsaPublicKey,
  requestAddressOwnershipAttestation,
  requestBalanceAttestation,
} from 'helpers/proofs/attestor'
import { handleError } from '@big-whale-labs/frontend-utils'
import Network from 'models/Network'
import buildERC721Proof from 'helpers/proofs/buildERC721Proof'
import checkNavigator from 'helpers/proofs/checkNavigator'
import getNullifierMessage from 'helpers/proofs/getNullifierMessage'
import walletStore from 'stores/WalletStore'

export default async function generateERC721(
  store: ProofStore,
  original: string,
  options: {
    network: Network
  }
) {
  try {
    const account = walletStore.account
    if (!account) throw new Error('No account selected')
    const eddsaPublicKey = await getEddsaPublicKey()
    const nullifierMessage = getNullifierMessage()
    const nullifierSignature = await walletStore.signMessage(nullifierMessage)
    const ownershipSignature = await requestAddressOwnershipAttestation(
      nullifierSignature,
      nullifierMessage
    )
    const balanceSignature = await requestBalanceAttestation(
      original,
      options.network,
      account
    )
    const result = await buildERC721Proof(
      ownershipSignature,
      balanceSignature,
      eddsaPublicKey
    )
    const proof = {
      original,
      result,
      account,
      dataType: store.dataKey,
      badgeType: BadgeSourceType.ERC721,
    }
    checkNavigator()
    store.proofsCompleted.push(proof)
    return proof
  } catch (e) {
    handleError(e)
  }
}
