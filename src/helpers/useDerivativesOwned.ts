import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'

export default function () {
  const { derivativeContractsToOwnersMaps } = useSnapshot(SealCredStore)
  const { account } = useSnapshot(WalletStore)
  return Object.entries(derivativeContractsToOwnersMaps).reduce(
    (result, [contractAddress, tokenIdsToOwners]) => {
      for (const [tokenId, ownerAddress] of Object.entries(tokenIdsToOwners)) {
        if (ownerAddress === account) {
          if (result[contractAddress]) {
            result[contractAddress].push(Number(tokenId))
          } else {
            result[contractAddress] = [Number(tokenId)]
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
