import { LinkText } from 'components/Text'
import { Suspense, useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import EnsAddress from 'components/EnsAddress'
import SealCredStore from 'stores/SealCredStore'
import env from 'helpers/env'

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

  const network =
    env.VITE_ETH_NETWORK !== 'mainnet' ? `${env.VITE_ETH_NETWORK}.` : ''
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
          url={`https://${network}etherscan.io/address/${address}`}
          gradientFrom="from-secondary"
          gradientTo="to-accent"
          title={address}
          bold
        >
          <EnsAddress address={address} />
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
