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
  origin: string,
  network: Network
) {
  try {
    // Get the account
    const account = walletStore.account
    if (!account) {
      throw new Error('No account selected')
    }
    // Get public key
    const eddsaPublicKey = await getEddsaPublicKey()
    // Get nullifier signature
    const nullifierMessage = getNullifierMessage()
    const nullifierSignature = await walletStore.signMessage(nullifierMessage)
    // Get ownership EdDSA attestation
    const ownershipSignature = await requestAddressOwnershipAttestation(
      nullifierSignature,
      nullifierMessage
    )
    // const network = data[store.dataKey].network
    // Get balance EdDSA attestation
    const balanceSignature = await requestBalanceAttestation(
      origin,
      network,
      account
    )
    // Get the proof
    const result = await buildERC721Proof(
      ownershipSignature,
      balanceSignature,
      eddsaPublicKey
    )
    const proof = {
      origin,
      result,
      account,
      dataType: store.dataKey,
    }
    checkNavigator()
    store.proofsCompleted.push(proof)
    return proof
  } catch (e) {
    handleError(e)
  }
}
