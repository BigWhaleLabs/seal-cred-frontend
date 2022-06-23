import { SCERC721Derivative__factory } from '@big-whale-labs/seal-cred-ledger-contract'

import defaultProvider from 'helpers/defaultProvider'

export default function (derivativeContract: string) {
  return {
    derivativeContract: SCERC721Derivative__factory.connect(
      derivativeContract,
      defaultProvider
    ),
  }
}
