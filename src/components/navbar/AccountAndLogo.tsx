import { useSnapshot } from 'valtio'
import Account from 'components/navbar/Account'
import Logo from 'components/navbar/Logo'
import WalletStore from 'stores/WalletStore'
import classnames, { lineHeight, textAlign, width } from 'classnames/tailwind'

const walletAccount = classnames(
  textAlign('text-right'),
  lineHeight('leading-5')
)

export default function ({
  account,
  connected,
}: {
  account?: string
  connected: boolean
}) {
  const { needNetworkChange } = useSnapshot(WalletStore)

  return (
    <>
      <div className={walletAccount}>
        <Account account={account} needNetworkChange={needNetworkChange} />
      </div>
      <div className={width('w-fit')}>
        <Logo connected={connected} />
      </div>
    </>
  )
}
