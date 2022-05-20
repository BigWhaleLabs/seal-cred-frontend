import { lazy } from 'react'
import CardSeparator from 'components/CardSeparator'
import LazyComponent from 'components/LazyComponent'
import ZkProofButton from 'components/ZkProofButton'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const mainBlock = classnames(
  display('flex'),
  flexDirection('flex-col', 'lg:flex-row'),
  alignItems('items-center', 'lg:items-stretch'),
  justifyContent('lg:justify-center')
)

const ProofsCard = lazy(() => import('components/ProofsCard'))
const Badges = lazy(() => import('components/Badges'))

export default function () {
  const { lg } = useBreakpoints()

  return (
    <>
      <div className={mainBlock}>
        <LazyComponent lazyImported={<ProofsCard />} />
        <CardSeparator
          numberOfLines={3}
          gradient="accent-to-secondary"
          vertical={!lg}
        />
        <LazyComponent lazyImported={<Badges />} />
        {!lg && (
          <>
            <CardSeparator
              numberOfLines={1}
              gradient="secondary-to-transparent"
              vertical
            />
            <ZkProofButton />
          </>
        )}
      </div>
    </>
  )
}
