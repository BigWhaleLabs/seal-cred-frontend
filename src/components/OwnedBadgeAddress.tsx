import { FC, Suspense, useEffect, useState } from 'react'
import { LinkText } from 'components/Text'
import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useBreakpoints from 'helpers/useBreakpoints'

function OwnedBadgeAddressSuspender({
  derivativeAddress,
  tokenId,
}: {
  derivativeAddress: string
  tokenId: string
}) {
  const { ledger } = useSnapshot(SealCredStore)
  const contract = Object.values(ledger).find(
    ({ derivativeContract }) => derivativeAddress === derivativeContract.address
  )
  const [address, setAddress] = useState<string | undefined>(undefined)
  const { md } = useBreakpoints()

  useEffect(() => {
    async function getAddress() {
      setAddress(await contract?.derivativeContract.ownerOf(tokenId))
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
          {truncateMiddleIfNeeded(address, md ? 13 : 11)}
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
