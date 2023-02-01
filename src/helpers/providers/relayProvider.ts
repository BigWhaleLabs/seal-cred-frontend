import { Eip1193Bridge } from '@ethersproject/experimental'
import { RelayProvider } from '@opengsn/provider'
import { Web3Provider } from '@ethersproject/providers'
import { WrapBridge } from '@opengsn/provider/dist/WrapContract'
import env from 'helpers/env'

export default function relayProvider(provider: Web3Provider) {
  return RelayProvider.newProvider({
    provider: new WrapBridge(new Eip1193Bridge(provider.getSigner(), provider)),
    config: {
      paymasterAddress: env.VITE_GSN_PAYMASTER_CONTRACT_ADDRESS,
    },
  }).init()
}
