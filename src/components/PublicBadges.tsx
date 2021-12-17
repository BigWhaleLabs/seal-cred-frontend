import { Link, SubheaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import FetchingData from 'components/FetchingData'
import PublicAccountStore from 'stores/PublicAccountStore'
import PublicBadge from 'components/PublicBadge'
import TokenType from 'models/TokenType'
import useAddress from 'hooks/useAddress'

const container = classnames(
  'flex',
  'flex-row',
  'flex-wrap',
  'gap-4',
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
      {!address &&
        publicAccountStoreSnapshot.publicBadges.find(
          (b) => b.type === TokenType.dosu1wave
        ) &&
        publicAccountStoreSnapshot.publicBadges.find(
          (b) => b.type === TokenType.dosuHandle
        ) && (
          <SubheaderText>
            Congratulations! You've got a combo of Dosu invite NFT and Dosu
            handle ownership. You can now{' '}
            <Link url="https://dosu.io">go back to Dosu</Link> and use it with
            the full set of features!
          </SubheaderText>
        )}
    </div>
  )
}
