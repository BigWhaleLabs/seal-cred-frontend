import { AccentText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Button from 'components/proofs/Button'
import Cross from 'icons/Cross'
import announceStore from 'stores/AnnounceStore'
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
} from 'classnames/tailwind'
import walletStore from 'stores/WalletStore'

const announceWrapper = classnames(
  backgroundColor('bg-primary-dimmed'),
  padding('px-6', 'py-4'),
  display('flex'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  fontWeight('font-bold'),
  fontSize('text-sm'),
  lineHeight('leading-5')
)

const crossWrapper = classnames(
  display('flex'),
  flex('flex-1'),
  margin('ml-auto')
)

export default function () {
  const { announceClosed, announceText } = useSnapshot(announceStore)
  const { account } = useSnapshot(walletStore)

  const closedOrAccountConnected = announceClosed || account

  return closedOrAccountConnected ? null : (
    <div className={announceWrapper}>
      <div className={classnames(flex('flex-1'))} />
      <AccentText small bold color="text-formal-accent">
        {announceText}
      </AccentText>
      <div className={crossWrapper}>
        <Button
          onClick={() => (announceStore.announceClosed = true)}
          className={classnames(margin('lg:ml-auto', 'ml-6'))}
        >
          <Cross />
        </Button>
      </div>
    </div>
  )
}
