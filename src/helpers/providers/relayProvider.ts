import { Eip1193Bridge } from '@ethersproject/experimental'
import { PingFilter } from '@opengsn/common'
import { RelayProvider } from '@opengsn/provider'
import { Web3Provider } from '@ethersproject/providers'
import { WrapBridge } from '@opengsn/provider/dist/WrapContract'
import env from 'helpers/env'

const GasPricePingFilter: PingFilter = (
  pingResponse,
  gsnTransactionDetails
) => {
  if (
    pingResponse.relayManagerAddress !== env.VITE_GSN_RELAY_MANAGER_ADDRESS &&
    gsnTransactionDetails.maxPriorityFeePerGas != null &&
    parseInt(pingResponse.minMaxPriorityFeePerGas) >
      parseInt(gsnTransactionDetails.maxPriorityFeePerGas)
  ) {
    throw new Error(
      `Proposed priority gas fee: ${parseInt(
        gsnTransactionDetails.maxPriorityFeePerGas
      )}; relay's minMaxPriorityFeePerGas: ${
        pingResponse.minMaxPriorityFeePerGas
      }`
    )
  }
}

export default function relayProvider(provider: Web3Provider) {
  return RelayProvider.newProvider({
    provider: new WrapBridge(new Eip1193Bridge(provider.getSigner(), provider)),
    config: {
      paymasterAddress: env.VITE_GSN_PAYMASTER_CONTRACT_ADDRESS,
      preferredRelays: [env.VITE_GSN_SC_RELAY],
    },
    overrideDependencies: {
      pingFilter: GasPricePingFilter,
    },
  })
}
