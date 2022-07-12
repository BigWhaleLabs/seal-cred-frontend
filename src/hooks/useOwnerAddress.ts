import {
  GoerliContractsStore,
  MainnetContractsStore,
} from 'stores/ContractsStore'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import Network from 'models/Network'
import TokenOwnersStore from 'stores/TokenOwnersStore'
import networkPick from 'helpers/networkPick'
import walletStore from 'stores/WalletStore'

export default function (
  derivativeAddress: string,
  tokenId: string,
  network: Network
) {
  const { connectedAccounts } = useSnapshot(
    networkPick(network, GoerliContractsStore, MainnetContractsStore)
  )
  const { account } = useSnapshot(walletStore)
  const { addressOwnerMap } = useSnapshot(TokenOwnersStore)

  const contractSynchronizer = account && connectedAccounts[account]

  const addressToTokenIds =
    contractSynchronizer && contractSynchronizer.tokenIds(derivativeAddress)

  const hasTokenId = addressToTokenIds && addressToTokenIds.includes(tokenId)

  useEffect(() => {
    if (!hasTokenId) TokenOwnersStore.fetchAddress(derivativeAddress, tokenId)
  }, [derivativeAddress, tokenId, hasTokenId])

  if (hasTokenId) return account

  return addressOwnerMap[derivativeAddress]
    ? addressOwnerMap[derivativeAddress][tokenId]
    : undefined
}
