import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'
import useContractAddressesOwned from 'hooks/useContractAddressesOwned'

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

  return Object.entries(derivativeContractsToOwnersMaps)
    .filter(([contractAddress]) =>
      derivativeContractAddressesOwned.includes(contractAddress)
    )
    .reduce(
      (result, [derivativeContractAddress, tokenIdToOwnerMap]) => {
        for (const [tokenId, ownerAddress] of Object.entries(
          tokenIdToOwnerMap
        )) {
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
