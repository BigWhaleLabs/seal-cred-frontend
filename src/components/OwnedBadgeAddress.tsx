import { FC, Suspense, useEffect, useState } from 'react'
import { LinkText } from 'components/Text'
import { useSnapshot } from 'valtio'
import StreetCredStore from 'stores/StreetCredStore'
import truncateMiddle from 'helpers/truncateMiddle'
import useWindowDimensions from 'helpers/useWindowDimensions'

function OwnedBadgeAddressSuspender({
  derivativeAddress,
  tokenId,
}: {
  derivativeAddress: string
  tokenId: string
}) {
  const { ledger } = useSnapshot(StreetCredStore)
  const contract = ledger[derivativeAddress].derivativeContract
  const [address, setAddress] = useState<string | undefined>(undefined)
  const { width } = useWindowDimensions()
  const mobile = width < 600

  useEffect(() => {
    async function getAddress() {
      setAddress(await contract.ownerOf(tokenId))
    }

    void getAddress()
  }, [contract, tokenId])

  return (
    <>
      {address && (
        <LinkText
          url={`https://etherscan.io/address/${address}`}
          gradientFrom="from-pink"
          gradientTo="to-yellow"
          title={address}
          bold
        >
          {truncateMiddle(address, mobile ? 11 : 13, -(mobile ? 11 : 14))}
        </LinkText>
      )}
    </>
  )
}

const OwnedBadgeAddress: FC<{ derivativeAddress: string; tokenId: string }> = ({
  derivativeAddress,
  tokenId,
}) => {
  return (
    <Suspense fallback={<>Fetching owner address...</>}>
      <OwnedBadgeAddressSuspender
        derivativeAddress={derivativeAddress}
        tokenId={tokenId}
      />
    </Suspense>
  )
}

export default OwnedBadgeAddress
