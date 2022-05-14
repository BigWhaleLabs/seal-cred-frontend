import { FC, Suspense, useEffect, useState } from 'react'
import { LinkText } from 'components/Text'
import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import truncateMiddle from 'helpers/truncateMiddle'
import useBreakpoints from 'helpers/useBreakpoints'

function OwnedBadgeAddressSuspender({
  derivativeAddress,
  tokenId,
}: {
  derivativeAddress: string
  tokenId: string
}) {
  const { derivativeLedger } = useSnapshot(SealCredStore)
  const record = derivativeLedger[derivativeAddress]
  const [address, setAddress] = useState<string | undefined>(undefined)
  const { md } = useBreakpoints()

  useEffect(() => {
    async function getAddress() {
      setAddress(await record?.derivativeContract.ownerOf(tokenId))
    }

    void getAddress()
  }, [record, tokenId])

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
          {truncateMiddle(address, !md ? 11 : 13, -(!md ? 11 : 14))}
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
