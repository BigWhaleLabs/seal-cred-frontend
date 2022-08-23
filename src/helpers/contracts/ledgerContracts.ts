import {
  Ledger,
  Ledger__factory,
} from '@big-whale-labs/seal-cred-ledger-contract'
import Network from '@big-whale-labs/stores/dist/models/Network'
import data from 'data'
import networks from 'networks'

export default Object.entries(data).reduce(
  (prev, [name, { ledger }]) => ({
    ...prev,
    [name]: Ledger__factory.connect(
      ledger,
      networks[Network.Goerli].defaultProvider
    ),
  }),
  {}
) as { [name: string]: Ledger }
