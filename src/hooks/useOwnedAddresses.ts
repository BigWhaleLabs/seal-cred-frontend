import Network from 'models/Network'
import useContractsOwned from 'hooks/useContractsOwned'

export default function (networkName?: Network) {
  const addressToTokenIds = useContractsOwned(networkName)

  return Object.keys(addressToTokenIds).map((address) => address.toLowerCase())
}
