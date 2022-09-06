import { SocialLink } from 'components/ui/Text'
import { displayFrom } from 'helpers/visibilityClassnames'
import { useSnapshot } from 'valtio'
import AccountAndLogo from 'components/navbar/AccountAndLogo'
import Discord from 'icons/Discord'
import ExternalLink from 'components/ui/ExternalLink'
import Network from 'models/Network'
import SealVerse from 'components/navbar/SealVerse'
import Twitter from 'icons/Twitter'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  backgroundColor,
  borderWidth,
  cursor,
  display,
  flexDirection,
  gap,
  height,
  space,
  width,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/network/getEtherscanAddressUrl'

const walletContainer = classnames(
  display('flex'),
  flexDirection('flex-col-reverse', 'xs:flex-row'),
  alignItems('items-center'),
  gap('gap-x-4'),
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
const lastDelimiterContainer = classnames(delimiterContainer, displayFrom('xs'))
const socialLinksContainer = classnames(displayFrom('md700'), socialContainer)

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
      <SealVerse />
      <hr className={lastDelimiterContainer} />

      <AccountContainer account={account} />
    </div>
  )
}
