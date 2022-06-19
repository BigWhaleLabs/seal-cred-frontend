import { LinkText } from 'components/Text'
import { SCERC721Derivative__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { Suspense, useEffect } from 'react'
import { proxy, useSnapshot } from 'valtio'
import { wordBreak } from 'classnames/tailwind'
import EnsAddress from 'components/EnsAddress'
import TokenIdToOwnerMap from 'models/TokenIdToOwnerMap'
import defaultProvider from 'helpers/defaultProvider'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import getTokenIdToOwnerMap from 'helpers/getTokenIdToOwnerMap'

const state = proxy({
  tokendIdToOwnerMap: Promise.resolve({}) as Promise<TokenIdToOwnerMap>,
})

const container = wordBreak('break-all')
function OwnedBadgeAddressSuspended({
  derivativeAddress,
  tokenId,
}: {
  derivativeAddress: string
  tokenId: string
}) {
  useEffect(() => {
    const derivativeContract = SCERC721Derivative__factory.connect(
      derivativeAddress,
      defaultProvider
    )
    state.tokendIdToOwnerMap = getTokenIdToOwnerMap(derivativeContract)
  }, [derivativeAddress])
  const { tokendIdToOwnerMap } = useSnapshot(state)
  const owner = tokendIdToOwnerMap[Number(tokenId)]

  return (
    <span className={container}>
      {owner && (
        <LinkText
          url={getEtherscanAddressUrl(owner)}
          gradientFrom="from-secondary"
          gradientTo="to-accent"
          title={owner}
          bold
        >
          <EnsAddress address={owner} />
        </LinkText>
      )}
    </span>
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
      <OwnedBadgeAddressSuspended
        derivativeAddress={derivativeAddress}
        tokenId={tokenId}
      />
    </Suspense>
  )
}
