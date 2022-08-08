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
  const maxPriorityFeePerGas = gsnTransactionDetails.maxPriorityFeePerGas
  const maxFeePerGasNumber = parseInt(maxPriorityFeePerGas)
  const minMaxFeePerGas = pingResponse.minMaxPriorityFeePerGas
  const minMaxFeePerGasNumber = parseInt(minMaxFeePerGas)
  if (
    maxPriorityFeePerGas !== null &&
    minMaxFeePerGasNumber > maxFeePerGasNumber
  )
    throw new Error(
      `Proposed priority gas fee: ${maxFeePerGasNumber}; relay's minMaxPriorityFeePerGas: ${minMaxFeePerGasNumber}`
    )
}

export default function relayProvider(provider: Web3Provider) {
  return RelayProvider.newProvider({
    provider: new WrapBridge(new Eip1193Bridge(provider.getSigner(), provider)),
    config: {
      paymasterAddress: env.VITE_GSN_PAYMASTER_CONTRACT_ADDRESS,
      preferredRelays: [env.VITE_GSN_SC_RELAY],
      blacklistedRelays: ['https://goerli.v3.opengsn.org/v3'],
    },
    overrideDependencies: {
      pingFilter: GasPricePingFilter,
    },
  }).init()
}
