import { BadgeSourceType } from 'data'
import { ProofStore } from 'stores/ProofStore'
import {
  getEddsaPublicKey,
  requestAddressOwnershipAttestation,
  requestBalanceAttestation,
} from 'helpers/proofs/attestor'
import Network from '@big-whale-labs/stores/dist/models/Network'
import buildERC721Proof from 'helpers/proofs/buildERC721Proof'
import checkNavigator from 'helpers/proofs/checkNavigator'
import getNullifierMessage from 'helpers/proofs/getNullifierMessage'
import handleError from 'helpers/handleError'
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
