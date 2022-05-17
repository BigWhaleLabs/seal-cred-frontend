import { FC, Suspense, useEffect, useState } from 'react'
import { LinkText } from 'components/Text'
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
          gradientTo="to-primary"
          title={address}
          bold
        >
          <EnsAddress address={address} />
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
