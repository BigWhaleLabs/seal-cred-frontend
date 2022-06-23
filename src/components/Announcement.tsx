import { AccentText } from 'components/Text'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Button from 'components/proofs/Button'
import Cross from 'icons/Cross'
import announcementStore from 'stores/AnnouncementStore'
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

export default function () {
  const { announcementClosed, announcementText } =
    useSnapshot(announcementStore)
  const { account } = useSnapshot(walletStore)
  const [animate, setAnimate] = useState(false)

  const closedOrAccountConnected = announcementClosed || account

  return closedOrAccountConnected ? null : (
    <div id="bottom-bar" className={announceWrapper(animate)}>
      <div className={classnames(flex('flex-1'))} />
      <AccentText small bold color="text-formal-accent">
        {announcementText}
      </AccentText>
      <div className={crossWrapper}>
        <Button
          onClick={() => {
            setTimeout(() => {
              announcementStore.announcementClosed = true
            }, 75)
            setAnimate(true)
          }}
          className={classnames(margin('lg:ml-auto', 'ml-6'))}
        >
          <Cross />
        </Button>
      </div>
    </div>
  )
}
