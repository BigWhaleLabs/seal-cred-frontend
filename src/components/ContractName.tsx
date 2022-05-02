import { BodyText } from 'components/Text'
import { SubheaderText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import StreetCredStore from 'stores/StreetCredStore'
import shortenedAddress from 'helpers/shortenedAddress'

function ContractNameComponent({
  address,
  account,
}: {
  address: string
  account?: string
}) {
  const { contractNames } = useSnapshot(StreetCredStore)
  return (
    <BodyText>
      {contractNames[address]
        ? `${contractNames[address]} (${shortenedAddress(address)})`
        : `Contract: ${shortenedAddress(address)}`}
      {!!account && ` for ${shortenedAddress(account)}`}
    </BodyText>
  )
}

export default function ContractName({
  address,
  account,
}: {
  address: string
  account?: string
}) {
  const shortAddress = `${address.slice(0, 5)}...${address.slice(
    -5,
    address.length
  )}`
  return (
    <Suspense fallback={<SubheaderText>{shortAddress}...</SubheaderText>}>
      <ContractNameComponent address={address} account={account} />
    </Suspense>
  )
}
