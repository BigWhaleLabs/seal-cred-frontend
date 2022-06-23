import { SealCredEmailLedger__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { providers } from 'ethers'
import env from 'helpers/env'

export default function (
  provider: providers.JsonRpcSigner | providers.Provider
) {
  return SealCredEmailLedger__factory.connect(
    env.VITE_SCWPLEDGER_CONTRACT_ADDRESS,
    provider
  )
}