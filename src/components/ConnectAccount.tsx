import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  fontFamily,
  fontSize,
  fontWeight,
  height,
  justifyContent,
  margin,
  textAlign,
  textColor,
  width,
} from 'classnames/tailwind'

const walletContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  height('h-full')
)

const contentWrapper = classnames(
  width('w-11/12', 'lg:w-9/12'),
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)

const cardTitle = classnames(
  fontFamily('font-primary'),
  textColor('text-accent'),
  fontSize('text-4xl'),
  fontWeight('font-bold'),
  margin('mb-4')
)

const bodyText = classnames(
  textColor('text-white'),
  textAlign('text-center'),
  margin('mb-8')
)

export default function ConnectAccount() {
  const { walletLoading } = useSnapshot(WalletStore)
  return (
    <div className={walletContainer}>
      <div className={contentWrapper}>
        <span className={cardTitle}>First</span>
        <span className={bodyText}>
          Connect a wallet with supported NFTs to create ZK proofs.
        </span>
        <Button
          colors="accent"
          loading={walletLoading}
          onClick={async () => {
            await WalletStore.connect(true)
          }}
        >
          <span>Connect a wallet</span>
        </Button>
      </div>
    </div>
  )
}
