import { Suspense, lazy } from 'react'
import {
  alignItems,
  classnames,
  display,
  flexDirection,
  flexWrap,
  gap,
  justifyContent,
} from 'classnames/tailwind'
import BadgesStore from 'stores/BadgesStore'
import FetchingData from 'components/FetchingData'
import useAddress from 'hooks/useAddress'

const PublicBadges = lazy(() => import('components/PublicBadges'))

const container = classnames(
  display('flex'),
  flexDirection('flex-row'),
  flexWrap('flex-wrap'),
  gap('gap-4'),
  justifyContent('justify-center'),
  alignItems('items-center')
)

function Badges() {
  const address = useAddress()
  BadgesStore.fetchPublicBadges(address)

  return (
    <Suspense
      fallback={
        <div className={container}>
          <FetchingData text={'Fetching Badges ...'} />
        </div>
      }
    >
      <PublicBadges />
    </Suspense>
  )
}

export default Badges
