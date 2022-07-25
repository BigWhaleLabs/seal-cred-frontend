import { AccentText, SocialLink } from 'components/Text'
import { useSnapshot } from 'valtio'
import Discord from 'icons/Discord'
import EnsAddress from 'components/EnsAddress'
import Network from 'models/Network'
import SealWallet from 'icons/SealWallet'
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
  space('space-x-4'),
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
const delimeterContainer = classnames(
  borderWidth('border-0'),
  backgroundColor('bg-primary-dimmed'),
  width('w-px'),
  height('h-4')
)

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
          <hr className={delimeterContainer} />
        </>
      )}
      <div
        className={accountLinkContainer}
        onClick={async () => {
          if (!account) return await WalletStore.connect(true)
          const newWindow = window.open(
            getEtherscanAddressUrl(account, Network.Goerli),
            '_blank'
          )
          if (!newWindow) return
          newWindow.focus()
          newWindow.opener = null
        }}
      >
        <div className={walletAccount}>
          <AccentText
            color={account ? 'text-accent' : 'text-primary-semi-dimmed'}
          >
            {account ? (
              <EnsAddress address={account} network={Network.Goerli} />
            ) : (
              'No wallet connected'
            )}
          </AccentText>
        </div>
        <div className={width('w-fit')}>
          <SealWallet connected={!!account} />
        </div>
      </div>
    </div>
  )
}
