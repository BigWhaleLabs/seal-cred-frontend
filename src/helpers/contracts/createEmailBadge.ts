import { SCEmailLedger__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { Web3Provider } from '@ethersproject/providers'
import EmailProof from 'helpers/proofs/EmailProof'
import env from 'helpers/env'
import makeTransaction from 'helpers/contracts/makeTransaction'

function createContract(provider: Web3Provider) {
  return SCEmailLedger__factory.connect(
    env.VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
    provider.getSigner(0)
  )
}

export default async function (provider: Web3Provider, proof: EmailProof) {
  if (!proof.result) throw new Error('Invalid proof')
  const contract = createContract(provider)
  const txData = makeTransaction(proof.result)

  const tx = await contract.mint(txData)

  return tx.wait()
}
