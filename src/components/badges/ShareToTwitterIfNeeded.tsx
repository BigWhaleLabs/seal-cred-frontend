import { BodyText } from 'components/ui/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Button from 'components/ui/Button'
import CTAText from 'helpers/CTAText'
import Cross from 'icons/Cross'
import ExternalLink from 'components/ui/ExternalLink'
import NotificationsStore from 'stores/NotificationsStore'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  flexWrap,
  gap,
  gridColumn,
  justifyContent,
  margin,
  padding,
  width,
} from 'classnames/tailwind'
import getShareToTwitterLink from 'helpers/getShareToTwitterLink'

const wideBlock = classnames(
  display('flex'),
  flexDirection('flex-row'),
  gap('gap-y-1', 'xs:gap-y-0', 'xs:gap-x-1'),
  flexWrap('flex-wrap', 'xs:flex-nowrap'),
  alignItems('items-center'),
  justifyContent('justify-between'),
  borderRadius('rounded-2xl'),
  backgroundColor('bg-primary-dimmed'),
  padding('lg:px-6', 'px-4', 'py-4'),
  gridColumn('lg:col-span-2', 'col-span-1')
)
const rightBlock = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-1')
)

function ShareToTwitterIfNeededSuspended() {
  const { showTwitterShare } = useSnapshot(NotificationsStore)

  if (!showTwitterShare) return null

  const closeNotification = () => (NotificationsStore.showTwitterShare = false)

  return (
    <div className={wideBlock}>
      <BodyText bold fontPrimary>
        You minted your first badge!
      </BodyText>
      <div className={rightBlock}>
        <ExternalLink url={getShareToTwitterLink({ text: CTAText })}>
          <Button type="secondary" onClick={closeNotification} small>
            <div className={width('xs:w-max')}>Share a Tweet</div>
          </Button>
        </ExternalLink>
        <button
          className={margin('ml-auto', 'xs:ml-0')}
          onClick={closeNotification}
        >
          <Cross />
        </button>
      </div>
    </div>
  )
}

export default function () {
  return (
    <Suspense fallback={<>Fetching contract ids...</>}>
      <ShareToTwitterIfNeededSuspended />
    </Suspense>
  )
}
