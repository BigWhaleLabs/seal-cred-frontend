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
import configuredModal from 'helpers/web3Modal'

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
  textColor('text-yellow'),
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
          Connect a wallet with NFTs to create ZK proof.
        </span>
        <Button
          colors="primary"
          loading={walletLoading}
          onClick={async () => {
            configuredModal.clearCachedProvider()
            await WalletStore.connect()
          }}
        >
          <span>Connect a wallet</span>
        </Button>
      </div>
    </div>
  )
}
