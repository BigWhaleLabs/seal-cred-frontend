import Network from 'models/Network'
import useContractsOwned from 'hooks/useContractsOwned'

export default function (address: string, store?: Network) {
  const addressToTokenIds = useContractsOwned(store)

  const key = Object.keys(addressToTokenIds).find(
    (storeAddress) => address.toLowerCase() === storeAddress.toLowerCase()
  )

  return key ? addressToTokenIds[key] : []
}
