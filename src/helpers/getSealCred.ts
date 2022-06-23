import { SealCredERC721Ledger__factory } from '@upacyxou/test-contract'
import { providers } from 'ethers'
import env from 'helpers/env'

export default function (
  provider: providers.JsonRpcSigner | providers.Provider
) {
  return SealCredERC721Ledger__factory.connect(
    env.VITE_SCLEDGER_CONTRACT_ADDRESS,
    provider
  )
}
