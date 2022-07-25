import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  gridColumn,
  padding,
} from 'classnames/tailwind'
import shareToTwitter from 'helpers/shareToTwitter'

const wideBlock = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  borderRadius('rounded-2xl'),
  backgroundColor('bg-primary-dimmed'),
  padding('lg:px-6', 'px-4', 'py-4'),
  gridColumn('lg:col-span-2', 'col-span-1')
)

export default function () {
  const { firstBadge } = useSnapshot(WalletStore)

  const showShareToTwitter = firstBadge.minted && !firstBadge.twitted

  if (!showShareToTwitter) return null

  return (
    <div className={wideBlock}>
      <BodyText bold fontPrimary>
        You minted your first badge!
      </BodyText>
      <Button
        type="secondary"
        onClick={() => {
          WalletStore.firstBadge.twitted = true
          shareToTwitter({
            text: 'Create zero knowledge proof and build your pseudonymous wallet with SealCred 🦭 sealcred.xyz',
          })
        }}
        textMaxWidth
        small
      >
        Share a Tweet
      </Button>
    </div>
  )
}
