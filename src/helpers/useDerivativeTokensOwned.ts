import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'
import useContractAddressesOwned from 'helpers/useContractAddressesOwned'

export default function () {
  const { derivativeContractsToOwnersMaps } = useSnapshot(SealCredStore)
  const { account } = useSnapshot(WalletStore)
  if (!account) {
    return {}
  }
  const { ledger } = useSnapshot(SealCredStore)
  if (!Object.keys(ledger).length) {
    return {}
  }
  const derivativeContractAddressesOwned =
    useContractAddressesOwned('derivative')
  return derivativeContractAddressesOwned.reduce(
    (result, derivativeContractAddress) => {
      const tokenIdToOwnerMap =
        derivativeContractsToOwnersMaps[derivativeContractAddress]
      for (const [tokenId, ownerAddress] of Object.entries(tokenIdToOwnerMap)) {
        if (ownerAddress === account) {
          if (result[derivativeContractAddress]) {
            result[derivativeContractAddress].push(Number(tokenId))
          } else {
            result[derivativeContractAddress] = [Number(tokenId)]
          }
        }
      }
      return result
    },
    {} as {
      [contractAddress: string]: number[]
    }
  )
}