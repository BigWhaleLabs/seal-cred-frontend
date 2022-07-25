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
  justifyContent,
  lineHeight,
  margin,
  padding,
  transitionProperty,
  translate,
} from 'classnames/tailwind'
import walletStore from 'stores/WalletStore'

const announceWrapper = (animate?: boolean) =>
  classnames(
    backgroundColor('bg-primary-dimmed'),
    padding('px-6', 'py-4'),
    display('flex'),
    alignItems('items-center'),
    justifyContent('justify-center'),
    fontWeight('font-bold'),
    fontSize('text-sm'),
    lineHeight('leading-5'),
    transitionProperty('transition-transform'),
    translate(animate ? '-translate-y-full' : undefined)
  )

const crossWrapper = classnames(
  display('flex'),
  flex('flex-1'),
  margin('ml-auto')
)

export default function ({ redirectTo }: { redirectTo: string }) {
  const { account } = useSnapshot(walletStore)
  const { announcementClosed } = useSnapshot(NotificationsStore)
  const [animate, setAnimate] = useState(false)
  const location = useLocation()

  if (announcementClosed) return null
  const onPage = location.pathname === redirectTo

  return (
    <div id="bottom-bar" className={announceWrapper(animate)}>
      <div className={flex('flex-1')} />
      <LinkText url={redirectTo}>
        <AccentText small bold color="text-formal-accent">
          Now introducing zk proof for your work email!{' '}
          {!onPage
            ? 'Get started'
            : account
            ? 'Get started below.'
            : 'Connect wallet to get started.'}
        </AccentText>
      </LinkText>
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
