import {
  goerliDefaultProvider,
  mainnetDefaultProvider,
} from 'helpers/providers/defaultProvider'
import {
  goerliHeavyProvider,
  mainnetHeavyProvider,
} from 'helpers/providers/heavyProvider'
import Network from '@big-whale-labs/stores/dist/models/Network'

export default {
  [Network.Mainnet]: {
    network: Network.Mainnet,
    defaultProvider: mainnetDefaultProvider,
    heavyProvider: mainnetHeavyProvider,
  },
  [Network.Goerli]: {
    network: Network.Goerli,
    defaultProvider: goerliDefaultProvider,
    heavyProvider: goerliHeavyProvider,
  },
}
