import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import CryptoWallet from 'icons/CryptoWallet'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  fontSize,
  fontWeight,
  margin,
  textAlign,
  textColor,
  width,
} from 'classnames/tailwind'
import configuredModal from 'helpers/web3Modal'

const walletContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)

const contentWrapper = classnames(
  width('w-9/12'),
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)

const cardTitle = classnames(
  textColor('text-accent-yellow'),
  fontSize('text-4xl'),
  fontWeight('font-bold'),
  margin('mb-4')
)

const bodyText = classnames(
  textColor('text-accent-white'),
  textAlign('text-center'),
  margin('mb-8')
)

export default function Wallet() {
  const { walletLoading } = useSnapshot(WalletStore)
  return (
    <div className={walletContainer}>
      <div className={contentWrapper}>
        <div className={cardTitle}>First</div>
        <div className={bodyText}>
          Connect a wallet with NFTs to create ZK proof.
        </div>
        <Button
          color="success"
          loading={walletLoading}
          onClick={async () => {
            configuredModal.clearCachedProvider()
            await WalletStore.connect()
          }}
        >
          <CryptoWallet />
          <span>Connect wallet</span>
        </Button>
      </div>
    </div>
  )
}
