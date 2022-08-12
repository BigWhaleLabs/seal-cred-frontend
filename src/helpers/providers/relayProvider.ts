import { Eip1193Bridge } from '@ethersproject/experimental'
import { RelayProvider } from '@opengsn/provider'
import { Web3Provider } from '@ethersproject/providers'
import { WrapBridge } from '@opengsn/provider/dist/WrapContract'
import env from 'helpers/env'

export function transformRelayErrorMessage(message: string) {
  if (/^Failed to relay call/.test(message)) {
    // Removes stack trace information
    message = message
      .split('stack')
      .filter((_, i) => i % 2 === 0)
      .join('\n')
  }

  return message
}

export default function relayProvider(provider: Web3Provider) {
  return RelayProvider.newProvider({
    provider: new WrapBridge(new Eip1193Bridge(provider.getSigner(), provider)),
    config: {
      paymasterAddress: env.VITE_GSN_PAYMASTER_CONTRACT_ADDRESS,
      preferredRelays: [env.VITE_GSN_SC_RELAY],
      blacklistedRelays: ['https://goerli.v3.opengsn.org/v3'],
    },
  }).init()
}
