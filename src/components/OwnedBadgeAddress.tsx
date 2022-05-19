import { LinkText } from 'components/Text'
import { Suspense, useEffect, useState } from 'preact/compat'
import { useSnapshot } from 'valtio'
import EnsAddress from 'components/EnsAddress'
import SealCredStore from 'stores/SealCredStore'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

function OwnedBadgeAddressSuspender({
  derivativeAddress,
  tokenId,
}: {
  derivativeAddress: string
  tokenId: string
}) {
  const { derivativeLedger } = useSnapshot(SealCredStore)
  const record = derivativeLedger[derivativeAddress]
  const [ownerAddress, setOwnerAddress] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    async function getAddress() {
      setOwnerAddress(await record?.derivativeContract.ownerOf(tokenId))
    }

    void getAddress()
  }, [record, tokenId])

  return (
    <>
      {ownerAddress && (
        <LinkText
          url={getEtherscanAddressUrl(ownerAddress)}
          gradientFrom="from-secondary"
          gradientTo="to-accent"
          title={ownerAddress}
          bold
        >
          <EnsAddress address={ownerAddress} truncate />
        </LinkText>
      )}
    </>
  )
}

interface OwnedBadgeAddressProps {
  derivativeAddress: string
  tokenId: string
}

export default function ({
  derivativeAddress,
  tokenId,
}: OwnedBadgeAddressProps) {
  return (
    <Suspense fallback={<>Fetching owner address...</>}>
      <OwnedBadgeAddressSuspender
        derivativeAddress={derivativeAddress}
        tokenId={tokenId}
      />
    </Suspense>
  )
}
