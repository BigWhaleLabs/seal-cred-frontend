import { SocialLink } from 'components/Text'
import { displayFrom } from 'helpers/visibilityClassnames'
import { useSnapshot } from 'valtio'
import AccountAndLogo from 'components/navbar/AccountAndLogo'
import Discord from 'icons/Discord'
import ExternalLink from 'components/ExternalLink'
import Network from 'models/Network'
import Twitter from 'icons/Twitter'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  backgroundColor,
  borderWidth,
  cursor,
  display,
  height,
  space,
  width,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

const walletContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('space-x-4'),
  cursor('cursor-pointer')
)
const accountLinkContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('xs:space-x-4', 'space-x-2'),
  cursor('cursor-pointer')
)
const socialContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('space-x-4')
)
const delimiterContainer = classnames(
  borderWidth('border-0'),
  backgroundColor('bg-primary-dimmed'),
  width('w-px'),
  height('h-4')
)
const socialLinksContainer = classnames(displayFrom('md'), socialContainer)

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
    <div className={walletContainer}>
      <div className={socialLinksContainer}>
        <SocialLink url="https://discord.gg/NHk96pPZUV">
          <Discord />
        </SocialLink>
        <SocialLink url="https://twitter.com/bigwhalelabs">
          <Twitter />
        </SocialLink>
        <hr className={delimiterContainer} />
      </div>

      <AccountContainer account={account} />
    </div>
  )
}
