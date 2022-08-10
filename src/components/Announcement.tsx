import { AccentText, LinkText } from 'components/Text'
import { useLocation } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Button from 'components/proofs/Button'
import Cross from 'icons/Cross'
import NotificationsStore from 'stores/NotificationsStore'
import classnames, {
  alignItems,
  backgroundColor,
  display,
  flex,
  fontSize,
  fontWeight,
  height,
  justifyContent,
  lineHeight,
  margin,
  opacity,
  padding,
  transitionDuration,
  transitionProperty,
  transitionTimingFunction,
} from 'classnames/tailwind'
import walletStore from 'stores/WalletStore'

const commonTransition = classnames(
  transitionDuration('duration-75'),
  transitionTimingFunction('ease-linear')
)

const announceWrapper = (animate?: boolean) =>
  classnames(
    backgroundColor('bg-primary-dimmed'),
    padding({ 'px-6': !animate, 'py-4': !animate }),
    display('flex'),
    alignItems('items-center'),
    justifyContent('justify-center'),
    fontWeight('font-bold'),
    fontSize('text-sm'),
    lineHeight('leading-5'),
    height({ 'h-0': animate }),
    transitionProperty('transition-all'),
    commonTransition
  )

const crossWrapper = classnames(
  display('flex'),
  flex('flex-1'),
  margin('ml-auto')
)

const textWrapper = (animate?: boolean) =>
  classnames(
    opacity({ 'opacity-0': animate }),
    transitionProperty('transition-all'),
    commonTransition
  )

export default function ({ redirectTo }: { redirectTo: string }) {
  const { account } = useSnapshot(walletStore)
  const { announcementClosed } = useSnapshot(NotificationsStore)
  const [animate, setAnimate] = useState(false)
  const location = useLocation()

  if (announcementClosed) return null
  const onPage = location.pathname === redirectTo

  const hasAccount = account
    ? 'Get started below.'
    : 'Connect wallet to get started'

  return (
    <div className={announceWrapper(animate)}>
      <div className={flex('flex-1')} />
      <div className={textWrapper(animate)}>
        <LinkText url={redirectTo}>
          <AccentText small bold color="text-formal-accent">
            Now introducing zk proofs for your work email!{' '}
            {onPage ? hasAccount : 'Get started'}
          </AccentText>
        </LinkText>
      </div>
      <div className={crossWrapper}>
        <Button
          onClick={() => {
            setTimeout(() => {
              NotificationsStore.announcementClosed = true
            }, 75)
            setAnimate(true)
          }}
          className={margin('lg:ml-auto', 'ml-6')}
        >
          <Cross />
        </Button>
      </div>
    </div>
  )
}
