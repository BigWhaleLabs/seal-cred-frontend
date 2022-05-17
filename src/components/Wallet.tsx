import { AccentText } from 'components/Text'
import { useSnapshot } from 'valtio'
import EnsAddress from 'components/EnsAddress'
import SealWallet from 'icons/SealWallet'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  cursor,
  display,
  lineHeight,
  space,
  textAlign,
  width,
} from 'classnames/tailwind'

const walletContainer = (accountExists: boolean) =>
  classnames(
    display('inline-flex'),
    alignItems('items-center'),
    space('space-x-4'),
    accountExists ? undefined : cursor('cursor-pointer')
  )
const walletAccount = classnames(
  textAlign('text-right'),
  lineHeight('leading-5'),
  display('sm:flex', 'hidden')
)

export default function Wallet() {
  const { account } = useSnapshot(WalletStore)

  return (
    <div
      className={walletContainer(!!account)}
      onClick={async () => {
        if (account) return
        await WalletStore.connect(true)
      }}
    >
      <div className={walletAccount}>
        <AccentText
          color={account ? 'text-primary' : 'text-accent-semi-dimmed'}
        >
          {account ? <EnsAddress address={account} /> : 'No wallet connected'}
        </AccentText>
      </div>
      <div className={classnames(width('w-fit'))}>
        <SealWallet connected={!!account} />
      </div>
    </div>
  )
}
