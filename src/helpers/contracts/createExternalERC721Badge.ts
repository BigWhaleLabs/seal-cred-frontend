import { ExternalSCERC721Ledger__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { Web3Provider } from '@ethersproject/providers'
import Proof from 'models/Proof'
import data from 'data'
import makeTransaction from 'helpers/contracts/makeTransaction'

function createContract(provider: Web3Provider) {
  return ExternalSCERC721Ledger__factory.connect(
    data['ExternalERC721'].ledger,
    provider.getSigner(0)
  )
}

export default async function (
  provider: Web3Provider,
  proof: Proof,
  message: string,
  signature: string
) {
  if (!proof.result) throw new Error('Invalid proof')
  const contract = createContract(provider)
  const txData = makeTransaction(proof.result)

  const tx = await contract[
    'mint((uint256[2],uint256[2][2],uint256[2],uint256[46]),bytes,bytes)'
  ](txData, message, signature)

  return tx.wait()
}
