import { Eip1193Bridge } from '@ethersproject/experimental'
import { RelayProvider } from '@opengsn/provider'
import { Web3Provider } from '@ethersproject/providers'
import { WrapBridge } from '@opengsn/provider/dist/WrapContract'
import env from 'helpers/env'

export default function relayProvider(provider: Web3Provider) {
  return RelayProvider.newProvider({
    config: {
      blacklistedRelays: [
        'https://gsn.fizen.io/',
        'https://goerli.3-0-0-beta-3.opengsn.org/v3 ',
      ],
      gasPriceFactorPercent: 150,
      getGasFeesBlocks: 15,
      minMaxPriorityFeePerGas: 8e9,
      paymasterAddress: env.VITE_GSN_PAYMASTER_CONTRACT_ADDRESS,
      preferredRelays: ['https://goerli.v3.relays.bwl.gg/'],
    },
    provider: new WrapBridge(new Eip1193Bridge(provider.getSigner(), provider)),
  }).init()
}
