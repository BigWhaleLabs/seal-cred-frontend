import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import TokenOwnersStore from 'stores/TokenOwnersStore'

export default function (derivativeAddress: string, tokenId: string) {
  useEffect(() => {
    TokenOwnersStore.fetchAddress(derivativeAddress, tokenId)
  }, [derivativeAddress, tokenId])

  const { addressOwnerMap } = useSnapshot(TokenOwnersStore)

  return addressOwnerMap[derivativeAddress]
    ? addressOwnerMap[derivativeAddress][tokenId]
    : undefined
}
