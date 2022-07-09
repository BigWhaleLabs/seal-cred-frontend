import { GoerliContractsStore } from 'stores/ContractsStore'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import TokenOwnersStore from 'stores/TokenOwnersStore'
import walletStore from 'stores/WalletStore'

export default function (derivativeAddress: string, tokenId: string) {
  const { connectedAccounts } = useSnapshot(GoerliContractsStore)
  const { account } = useSnapshot(walletStore)
  const { addressOwnerMap } = useSnapshot(TokenOwnersStore)

  const contractSynchronizer = account && connectedAccounts[account]

  const addressToTokenIds =
    contractSynchronizer &&
    contractSynchronizer.addressToTokenIds[derivativeAddress]

  const hasTokenId = addressToTokenIds && addressToTokenIds.has(tokenId)

  useEffect(() => {
    if (!hasTokenId) TokenOwnersStore.fetchAddress(derivativeAddress, tokenId)
  }, [derivativeAddress, tokenId, hasTokenId])

  if (hasTokenId) return account

  return addressOwnerMap[derivativeAddress]
    ? addressOwnerMap[derivativeAddress][tokenId]
    : undefined
}
