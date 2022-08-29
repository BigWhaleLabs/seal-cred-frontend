import { SCEmailLedger__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { Web3Provider } from '@ethersproject/providers'
import Proof from 'models/Proof'
import data from 'data'
import makeTransaction from 'helpers/contracts/makeTransaction'

function createContract(provider: Web3Provider) {
  return SCEmailLedger__factory.connect(
    data['Email'].ledger,
    provider.getSigner(0)
  )
}

export default async function (provider: Web3Provider, proof: Proof) {
  if (!proof.result) throw new Error('Invalid proof')
  const contract = createContract(provider)
  const txData = makeTransaction(proof.result)

  const tx = await contract.mint(txData)

  return tx.wait()
}
