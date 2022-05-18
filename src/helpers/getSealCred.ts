import { SealCredLedger__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { providers } from 'ethers'
import env from 'helpers/env'

export default function (
  provider: providers.JsonRpcSigner | providers.Provider
) {
  return SealCredLedger__factory.connect(
    env.VITE_SCLEDGER_CONTRACT_ADDRESS,
    provider
  )
}
