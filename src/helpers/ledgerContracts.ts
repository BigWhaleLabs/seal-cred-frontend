import {
  Ledger,
  Ledger__factory,
} from '@big-whale-labs/seal-cred-ledger-contract'
import { goerliDefaultProvider } from 'helpers/providers/defaultProvider'
import data from 'data'

export default Object.entries(data).reduce(
  (prev, [name, { ledger }]) => ({
    ...prev,
    [name]: Ledger__factory.connect(ledger, goerliDefaultProvider),
  }),
  {}
) as { [name: string]: Ledger }
