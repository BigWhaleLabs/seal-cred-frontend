import { SCERC721Ledger__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { Web3Provider } from '@ethersproject/providers'
import ERC721Proof from 'helpers/ERC721Proof'
import env from 'helpers/env'
import makeTransaction from 'helpers/makeTransaction'

function createContract(provider: Web3Provider) {
  return SCERC721Ledger__factory.connect(
    env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS,
    provider.getSigner(0)
  )
}

export default async function (provider: Web3Provider, proof: ERC721Proof) {
  const contract = createContract(provider)
  const txData = makeTransaction(proof.result)
  const tx = await contract.mint(txData)

  return tx.wait()
}
