import { SCExternalERC721Ledger__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { Web3Provider } from '@ethersproject/providers'
import { requestContractMetadata } from 'helpers/proofs/attestor'
import { splitSignature } from 'ethers/lib/utils'
import Network from '@big-whale-labs/stores/dist/models/Network'
import Proof from 'models/Proof'
import data from 'data'
import makeTransaction from 'helpers/contracts/makeTransaction'

function createContract(provider: Web3Provider) {
  return SCExternalERC721Ledger__factory.connect(
    data['ExternalERC721'].ledger,
    provider.getSigner(0)
  )
}

export default async function (provider: Web3Provider, proof: Proof) {
  const { message, signature } = await requestContractMetadata(
    Network.Mainnet,
    proof.original
  )
  if (!proof.result) throw new Error('Invalid proof')
  const contract = createContract(provider)
  const txData = makeTransaction(proof.result)
  const { r, yParityAndS } = splitSignature(signature)

  const tx = await contract[
    'mint((uint256[2],uint256[2][2],uint256[2],uint256[46]),bytes,bytes32,bytes32)'
  ](txData, message, r, yParityAndS)

  return tx.wait()
}
