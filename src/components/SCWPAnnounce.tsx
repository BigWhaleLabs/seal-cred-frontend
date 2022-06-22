import { AccentText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Button from 'components/proofs/Button'
import Cross from 'icons/Cross'
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
import scwpStore from 'stores/SCWPStore'
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

const cross = classnames(margin('lg:ml-auto', 'ml-6'))

export default function () {
  const { announceClosed } = useSnapshot(scwpStore)
  const { account } = useSnapshot(walletStore)

  if (announceClosed || account) return null

  return (
    <div className={announceWrapper}>
      <div className={classnames(flex('flex-1'))} />
      <AccentText small bold color="text-formal-accent">
        Now introducing zk proof for your work email! Connect wallet to get
        started.
      </AccentText>
      <div className={crossWrapper}>
        <Button
          onClick={() => (scwpStore.announceClosed = true)}
          className={cross}
        >
          <Cross />
        </Button>
      </div>
    </div>
  )
}
