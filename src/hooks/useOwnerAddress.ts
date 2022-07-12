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
  const { addressToTokenIds } = useSnapshot(
    networkPick(network, GoerliContractsStore, MainnetContractsStore)
  )
  const { account } = useSnapshot(walletStore)
  const { addressOwnerMap } = useSnapshot(TokenOwnersStore)

  const hasTokenId = addressToTokenIds && addressToTokenIds[derivativeAddress]

  useEffect(() => {
    if (!hasTokenId) TokenOwnersStore.fetchAddress(derivativeAddress, tokenId)
  }, [derivativeAddress, tokenId, hasTokenId])

  if (hasTokenId) return account

  return addressOwnerMap[derivativeAddress]
    ? addressOwnerMap[derivativeAddress][tokenId]
    : undefined
}
