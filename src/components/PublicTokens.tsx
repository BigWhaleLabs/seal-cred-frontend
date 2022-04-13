import { BadgeDescription, BadgeType } from 'models/BadgeToken'
import { BadgeText } from 'components/Text'
import { FC, Suspense, useEffect } from 'react'
import {
  alignItems,
  borderColor,
  borderRadius,
  borderWidth,
  classnames,
  display,
  flexDirection,
  flexWrap,
  gap,
  justifyContent,
  padding,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import FetchingData from 'components/FetchingData'
import PublicAccountStore from 'stores/PublicAccountStore'
import TokensStore from 'stores/TokensStore'
import configuredModal from 'helpers/configuredModal'

const badgesWrapper = classnames(
  display('flex'),
  flexDirection('flex-row'),
  flexWrap('flex-wrap'),
  gap('gap-4'),
  justifyContent('justify-center'),
  alignItems('items-center')
)

const badge = classnames(
  display('flex'),
  borderWidth('border'),
  borderColor('border-primary-dimmed'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  padding('py-2', 'px-4'),
  borderRadius('rounded')
)

const Badge: FC<{ token: BadgeType }> = ({ token }) => {
  return (
    <div className={badge}>
      <BadgeText>{BadgeDescription[token]}</BadgeText>
    </div>
  )
}

const Tokens = () => {
  const { badges } = useSnapshot(TokensStore)
  const badgesList = Object.keys(badges) as BadgeType[]

  return (
    <>
      {badgesList.length > 0 &&
        badgesList.map((badge, index) => (
          <>
            {BadgeDescription[badge] && (
              <Badge token={badge} key={`${index}-${badge}`} />
            )}
          </>
        ))}
    </>
  )
}

const PublicTokens = () => {
  const { account } = useSnapshot(PublicAccountStore)

  useEffect(() => {
    if (configuredModal.cachedProvider) {
      void PublicAccountStore.onConnect()
    }
  }, [])

  useEffect(() => {
    void TokensStore.requestTokens(account)
  }, [account])

  return (
    <div className={badgesWrapper}>
      <Suspense fallback={<FetchingData text="Fetching badges..." />}>
        <Tokens />
      </Suspense>
    </div>
  )
}

export default PublicTokens
