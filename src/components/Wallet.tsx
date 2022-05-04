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
import truncateMiddle from 'helpers/truncateMiddle'

const walletContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('space-x-4'),
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
        <AccentText color={account ? 'text-yellow' : 'text-blue-600'}>
          {account ? truncateMiddle(account) : 'No wallet connected'}
        </AccentText>
      </div>
      <div className={classnames(width('w-fit'))}>
        <SealWallet connected={!!account} />
      </div>
    </div>
  )
}
