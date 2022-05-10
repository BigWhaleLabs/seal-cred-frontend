import { StreetCredLedger__factory } from '@big-whale-labs/street-cred-ledger-contract'
import { providers } from 'ethers'
import env from 'helpers/env'

export default function getStreetCred(
  provider: providers.JsonRpcSigner | providers.Provider
) {
  return StreetCredLedger__factory.connect(
    env.VITE_SC_LEDGER_CONTRACT_ADDRESS,
    provider
  )
}
