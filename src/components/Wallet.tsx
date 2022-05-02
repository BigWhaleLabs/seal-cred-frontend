import { AccentText } from 'components/Text'
import { useSnapshot } from 'valtio'
import SealWallet from 'icons/SealWallet'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  cursor,
  display,
  space,
  textAlign,
  width,
} from 'classnames/tailwind'
import configuredModal from 'helpers/web3Modal'
import truncate from 'helpers/truncate'

const walletContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('space-x-3'),
  cursor('cursor-pointer')
)
const walletAccount = classnames(textAlign('text-center'))

export default function Wallet() {
  const { account } = useSnapshot(WalletStore)
  return (
    <div
      className={walletContainer}
      onClick={async () => {
        configuredModal.clearCachedProvider()
        await WalletStore.connect()
      }}
    >
      <div className={walletAccount}>
        <AccentText active={!!account}>
          {account ? truncate(account) : 'No wallet connected'}
        </AccentText>
      </div>
      <div className={classnames(width('w-full'))}>
        <SealWallet connected={!!account} />
      </div>
    </div>
  )
}
