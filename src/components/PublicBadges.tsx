import { Link, SubheaderText } from 'components/Text'
import {
  alignItems,
  classnames,
  display,
  flexDirection,
  flexWrap,
  gap,
  justifyContent,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import BadgesStore from 'stores/BadgesStore'
import PublicBadge from 'components/PublicBadge'
import TokenType from 'models/TokenType'
import useAddress from 'hooks/useAddress'

const container = classnames(
  display('flex'),
  flexDirection('flex-row'),
  flexWrap('flex-wrap'),
  gap('gap-4'),
  justifyContent('justify-center'),
  alignItems('items-center')
)
export default function PublicBadges() {
  const { badges } = useSnapshot(BadgesStore)
  const address = useAddress()

  return (
    <div className={container}>
      {badges.length ? (
        badges.map((badge) => (
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
        badges.find((b) => b.type === TokenType.dosu1wave) &&
        badges.find((b) => b.type === TokenType.dosuHandle) && (
          <SubheaderText>
            Congratulations! You've got a combo of Dosu invite NFT and Dosu
            handle ownership. You can now{' '}
            <Link url={import.meta.env.VITE_DOSU_FRONTEND as string}>
              go back to Dosu
            </Link>{' '}
            and use it with the full set of features!
          </SubheaderText>
        )}
    </div>
  )
}
