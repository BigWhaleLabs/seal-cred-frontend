import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Cross from 'icons/Cross'
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

export default function () {
  const { showTwitterShare } = useSnapshot(NotificationsStore)

  if (!showTwitterShare) return null

  const closeNotification = () => (NotificationsStore.showTwitterShare = false)

  const twitterLink = getShareToTwitterLink({
    text: 'Create zero knowledge proof and build your pseudonymous wallet with SealCred 🦭 sealcred.xyz',
    hashtags: ['zk', 'zkWallet', 'Eth'],
  })

  return (
    <div className={wideBlock}>
      <BodyText bold fontPrimary>
        You minted your first badge!
      </BodyText>
      <a href={twitterLink}>
        <Button type="secondary" onClick={() => closeNotification()} small>
          <div className={width('tiny:w-max')}>Share a Tweet</div>
        </Button>
      </a>
      <button onClick={closeNotification}>
        <Cross />
      </button>
    </div>
  )
}
