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

export default function () {
  const { announceClosed } = useSnapshot(scwpStore)
  const { account } = useSnapshot(walletStore)

  if (announceClosed || account) return null

  return (
    <div
      className={classnames(
        backgroundColor('bg-primary-dimmed'),
        padding('px-6', 'py-4'),
        display('flex'),
        alignItems('items-center'),
        justifyContent('justify-center'),
        fontWeight('font-bold'),
        fontSize('text-sm'),
        lineHeight('leading-5')
      )}
    >
      <div className={classnames(flex('flex-1'))} />
      <AccentText small bold color="text-formal-accent">
        Now introducing zk proof for your work email! Connect wallet to get
        started.
      </AccentText>
      <div
        className={classnames(
          display('flex'),
          flex('flex-1'),
          margin('ml-auto')
        )}
      >
        <Button
          onClick={() => (scwpStore.announceClosed = true)}
          className={classnames(margin('lg:ml-auto', 'ml-6'))}
        >
          <Cross />
        </Button>
      </div>
    </div>
  )
}
