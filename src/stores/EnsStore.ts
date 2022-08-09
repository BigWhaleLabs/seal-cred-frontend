import { EnsStore } from '@big-whale-labs/store-utils'
import {
  goerliDefaultProvider,
  mainnetDefaultProvider,
} from 'helpers/providers/defaultProvider'
import { proxy } from 'valtio'

export const GoerliEnsStore = proxy(new EnsStore(goerliDefaultProvider))
export const MainnetEnsStore = proxy(new EnsStore(mainnetDefaultProvider))
