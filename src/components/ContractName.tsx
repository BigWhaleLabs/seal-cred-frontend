import { SubheaderText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import StreetCredStore from 'stores/StreetCredStore'
import shortenedAddress from 'helpers/shortenedAddress'

function ContractNameComponent({ address }: { address: string }) {
  const { contractNames } = useSnapshot(StreetCredStore)
  return (
    <>
      {contractNames[address]
        ? contractNames[address]
        : `Contract: ${shortenedAddress(address)}`}
    </>
  )
}

export default function ContractName({ address }: { address: string }) {
  const shortAddress = `${address.slice(0, 5)}...${address.slice(
    -5,
    address.length
  )}`
  return (
    <Suspense fallback={<SubheaderText>{shortAddress}...</SubheaderText>}>
      <ContractNameComponent address={address} />
    </Suspense>
  )
}
