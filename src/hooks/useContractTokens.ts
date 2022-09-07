import Network from 'models/Network'
import useContractsOwned from 'hooks/useContractsOwned'

export default function (address: string, network?: Network) {
  const addressToTokenIds = useContractsOwned(network)

  const key = Object.keys(addressToTokenIds).find(
    (storeAddress) => address.toLowerCase() === storeAddress.toLowerCase()
  )

  return key ? addressToTokenIds[key] : []
}
