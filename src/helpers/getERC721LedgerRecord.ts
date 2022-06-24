import {
  ERC721__factory,
  SCERC721Derivative__factory,
} from '@big-whale-labs/seal-cred-ledger-contract'
import defaultProvider from 'helpers/defaultProvider'

export default function (originalContract: string, derivativeContract: string) {
  return {
    originalContract: ERC721__factory.connect(
      originalContract,
      defaultProvider
    ),
    derivativeContract: SCERC721Derivative__factory.connect(
      derivativeContract,
      defaultProvider
    ),
  }
}
