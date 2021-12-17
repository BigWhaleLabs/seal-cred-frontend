import { SubheaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import FetchingData from 'components/FetchingData'
import PublicAccountStore from 'stores/PublicAccountStore'
import PublicBadge from 'components/PublicBadge'
import useAddress from 'hooks/useAddress'

const container = classnames(
  'flex',
  'flex-row',
  'flex-wrap',
  'space-x-2',
  'justify-center',
  'items-center'
)
export default function PublicBadges() {
  const publicAccountStoreSnapshot = useSnapshot(PublicAccountStore)
  const address = useAddress()

  useEffect(() => {
    void PublicAccountStore.fetchPublicBadges(address)
  }, [address])

  return (
    <div className={container}>
      {publicAccountStoreSnapshot.loading ? (
        <FetchingData />
      ) : publicAccountStoreSnapshot.publicBadges.length ? (
        publicAccountStoreSnapshot.publicBadges.map((badge) => (
          <PublicBadge
            badge={badge}
            key={`${badge.type}${badge.identityType}${badge.extraPublicIdentifier}`}
          />
        ))
      ) : (
        <SubheaderText>
          {!address
            ? "You haven't disclosed any NFT badges yet"
            : "The owner of this address hasn't disclosed any NFT badges yet"}
        </SubheaderText>
      )}
    </div>
  )
}
