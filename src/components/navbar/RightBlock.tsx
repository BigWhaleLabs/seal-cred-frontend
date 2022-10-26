import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { useSnapshot } from 'valtio'
import AccountAndLogo from 'components/navbar/AccountAndLogo'
import Delimiter from 'components/navbar/Delimiter'
import ExternalLink from 'components/ui/ExternalLink'
import Network from 'models/Network'
import SealVerse from 'components/navbar/SealVerse'
import SocialLinks from 'components/navbar/SocialLinks'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  cursor,
  display,
  flexDirection,
  gap,
  space,
  whitespace,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/network/getEtherscanAddressUrl'

const walletContainer = classnames(
  display('flex'),
  flexDirection('flex-col-reverse', 'xs:flex-row'),
  alignItems('items-center'),
  gap('gap-x-3', 'sm:gap-x-4'),
  cursor('cursor-pointer'),
  displayFrom('xs')
)
const accountLinkContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('xs:space-x-4', 'space-x-2'),
  cursor('cursor-pointer'),
  whitespace('whitespace-nowrap')
)

const AccountContainer = ({ account }: { account?: string }) => {
  const { needNetworkChange } = useSnapshot(WalletStore)

  if (account)
    return (
      <ExternalLink url={getEtherscanAddressUrl(account, Network.Goerli)}>
        <div className={accountLinkContainer}>
          <AccountAndLogo account={account} connected={true} />
        </div>
      </ExternalLink>
    )

  return (
    <div
      className={accountLinkContainer}
      onClick={async () => {
        await WalletStore.changeNetworkOrConnect({
          clearCachedProvider: true,
          needNetworkChange,
        })
      }}
    >
      <AccountAndLogo connected={false} />
    </div>
  )
}

export default function () {
  const { account } = useSnapshot(WalletStore)

  return (
    <>
      <div className={walletContainer}>
        <SocialLinks />
        <SealVerse />
        <Delimiter />
        <AccountContainer account={account} />
      </div>

      <div className={displayTo('xs')}>
        <AccountContainer account={account} />
      </div>
      <div className={displayTo('xs')}>
        <SealVerse />
      </div>
    </>
  )
}
