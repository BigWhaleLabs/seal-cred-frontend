import { Eip1193Bridge } from '@ethersproject/experimental'
import { ExternalProvider, Web3Provider } from '@ethersproject/providers'
import { RelayProvider } from '@opengsn/provider'
import { WrapBridge } from '@opengsn/provider/dist/WrapContract'
import env from 'helpers/env'

export default async function gsnContract(provider: Web3Provider) {
  return (await RelayProvider.newProvider({
    provider: new WrapBridge(new Eip1193Bridge(provider.getSigner(), provider)),
    config: {
      paymasterAddress: env.VITE_PAYMASTER_CONTRACT_ADDRESS,
      preferredRelays: [env.VITE_GSN_SC_RELAY],
    },
  }).init()) as unknown as ExternalProvider
}
