import { BodyText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import CTAText from 'helpers/CTAText'
import Cross from 'icons/Cross'
import ExternalLink from 'components/ExternalLink'
import NotificationsStore from 'stores/NotificationsStore'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  gridColumn,
  padding,
  space,
  width,
} from 'classnames/tailwind'
import getShareToTwitterLink from 'helpers/getShareToTwitterLink'

const wideBlock = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-1'),
  alignItems('items-center'),
  borderRadius('rounded-2xl'),
  backgroundColor('bg-primary-dimmed'),
  padding('lg:px-6', 'px-4', 'py-4'),
  gridColumn('lg:col-span-2', 'col-span-1')
)

function ShareToTwitterIfNeededSuespended() {
  const { showTwitterShare } = useSnapshot(NotificationsStore)

  if (!showTwitterShare) return null

  const closeNotification = () => (NotificationsStore.showTwitterShare = false)

  return (
    <div className={wideBlock}>
      <BodyText bold fontPrimary>
        You minted your first badge!
      </BodyText>
      <ExternalLink url={getShareToTwitterLink({ text: CTAText })}>
        <Button type="secondary" onClick={closeNotification} small>
          <div className={width('tiny:w-max')}>Share a Tweet</div>
        </Button>
      </ExternalLink>
      <button onClick={closeNotification}>
        <Cross />
      </button>
    </div>
  )
}

export default function () {
  return (
    <Suspense fallback={<>Fetching contract ids...</>}>
      <ShareToTwitterIfNeededSuespended />
    </Suspense>
  )
}
