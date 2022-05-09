import { SealCredLedger__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { providers } from 'ethers'
import env from 'helpers/env'

export default function getSealCred(
  provider: providers.JsonRpcSigner | providers.Provider
) {
  return SealCredLedger__factory.connect(
    env.VITE_SC_LEDGER_CONTRACT_ADDRESS,
    provider
  )
}
