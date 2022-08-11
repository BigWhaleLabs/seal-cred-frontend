import { ENSStore } from '@big-whale-labs/stores'
import {
  goerliDefaultProvider,
  mainnetDefaultProvider,
} from 'helpers/providers/defaultProvider'
import { proxy } from 'valtio'

export const GoerliEnsStore = proxy(new ENSStore(goerliDefaultProvider))
export const MainnetEnsStore = proxy(new ENSStore(mainnetDefaultProvider))
