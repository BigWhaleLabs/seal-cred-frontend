import { AccentText, SocialLink } from 'components/Text'
import { useSnapshot } from 'valtio'
import Discord from 'icons/Discord'
import ENSAddress from 'components/ENSAddress'
import ExternalLink from 'components/ExternalLink'
import Network from 'models/Network'
import SealWallet from 'icons/SealWallet'
import SmallSeal from 'icons/SmallSeal'
import Twitter from 'icons/Twitter'
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
import useBreakpoints from 'hooks/useBreakpoints'

const walletContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('space-x-4'),
  cursor('cursor-pointer')
)
const accountLinkContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('tiny:space-x-4', 'space-x-2'),
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

  const { xs } = useBreakpoints()

  if (account)
    return (
      <ExternalLink url={getEtherscanAddressUrl(account, Network.Goerli)}>
        <div className={accountLinkContainer}>
          <div className={walletAccount}>
            <AccentText extraSmall={xs} color="text-accent">
              <ENSAddress address={account} network={Network.Goerli} />
            </AccentText>
          </div>
          <div className={width('w-fit')}>
            {xs ? (
              <SmallSeal connected={true} />
            ) : (
              <SealWallet connected={true} />
            )}
          </div>
        </div>
      </ExternalLink>
    )

  return (
    <div
      className={accountLinkContainer}
      onClick={async () => await WalletStore.connect(true)}
    >
      <div className={walletAccount}>
        <AccentText extraSmall={xs} color="text-primary-semi-dimmed">
          {needNetworkChange
            ? 'Change network'
            : xs
            ? 'No wallet'
            : 'No wallet connected'}
        </AccentText>
      </div>
      <div className={width('w-fit')}>
        {xs ? (
          <SmallSeal connected={false} />
        ) : (
          <SealWallet connected={false} />
        )}
      </div>
    </div>
  )
}

export default function () {
  const { account } = useSnapshot(WalletStore)
  const { md } = useBreakpoints()

  return (
    <div className={walletContainer}>
      {md && (
        <>
          <div className={socialContainer}>
            <SocialLink url="https://discord.gg/NHk96pPZUV">
              <Discord />
            </SocialLink>
            <SocialLink url="https://twitter.com/bigwhalelabs">
              <Twitter />
            </SocialLink>
          </div>
          <hr className={delimiterContainer} />
        </>
      )}

      <AccountContainer account={account} />
    </div>
  )
}
