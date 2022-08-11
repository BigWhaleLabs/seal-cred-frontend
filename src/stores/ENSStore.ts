import { ENSStore } from '@big-whale-labs/stores'
import {
  goerliDefaultProvider,
  mainnetDefaultProvider,
} from 'helpers/providers/defaultProvider'
import { proxy } from 'valtio'

export const GoerliENSStore = proxy(new ENSStore(goerliDefaultProvider))
export const MainnetENSStore = proxy(new ENSStore(mainnetDefaultProvider))
