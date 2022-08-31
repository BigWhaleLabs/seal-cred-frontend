import { ENSStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import Network from 'models/Network'
import networks from 'networks'

export default proxy({
  networks: Object.values(networks).reduce(
    (res, { defaultProvider, network }) => ({
      ...res,
      [network]: proxy(new ENSStore(defaultProvider)),
    }),
    {} as { [network in Network]: ENSStore }
  ),
})
