import { SocialLink } from 'components/Text'
import { displayFromMd } from 'helpers/visibilityClassnames'
import { useSnapshot } from 'valtio'
import ConnectedAddress from 'components/navbar/Connected/Address'
import ConnectedLogo from 'components/navbar/Connected/Logo'
import Discord from 'icons/Discord'
import ExternalLink from 'components/ExternalLink'
import Network from 'models/Network'
import Twitter from 'icons/Twitter'
import UnconnectedAddress from 'components/navbar/Unconnected/Address'
import UnconnectedLogo from 'components/navbar/Unconnected/Logo'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  backgroundColor,
  borderWidth,
  cursor,
  display,
  height,
  lineHeight,
  space,
  textAlign,
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
const walletAccount = classnames(
  textAlign('text-right'),
  lineHeight('leading-5')
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

const AccountContainer = ({ account }: { account?: string }) => {
  const { needNetworkChange } = useSnapshot(WalletStore)

  if (account)
    return (
      <ExternalLink url={getEtherscanAddressUrl(account, Network.Goerli)}>
        <div className={accountLinkContainer}>
          <div className={walletAccount}>
            <ConnectedAddress account={account} />
          </div>
          <div className={width('w-fit')}>
            <ConnectedLogo />
          </div>
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
      <div className={walletAccount}>
        <UnconnectedAddress needNetworkChange={needNetworkChange} />
      </div>
      <div className={width('w-fit')}>
        <UnconnectedLogo />
      </div>
    </div>
  )
}

export default function () {
  const { account } = useSnapshot(WalletStore)

  return (
    <div className={walletContainer}>
      <span className={displayFromMd}>
        <div className={socialContainer}>
          <SocialLink url="https://discord.gg/NHk96pPZUV">
            <Discord />
          </SocialLink>
          <SocialLink url="https://twitter.com/bigwhalelabs">
            <Twitter />
          </SocialLink>
          <hr className={delimiterContainer} />
        </div>
      </span>

      <AccountContainer account={account} />
    </div>
  )
}
