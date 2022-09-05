import { AccentText, BodyText, HeaderText } from 'components/ui/Text'
import { toast } from 'react-toastify'
import { useSnapshot } from 'valtio'
import Button from 'components/ui/Button'
import CharInCircle from 'components/ui/CharInCircle'
import Sizes from 'models/MarkSizes'
import ToolTip from 'components/ui/ToolTip'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  height,
  justifyContent,
  margin,
  space,
  textDecoration,
  width,
} from 'classnames/tailwind'
import useUrlParams from 'hooks/useUrlParams'

const walletContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  height('h-full'),
  margin('my-auto')
)

const contentWrapper = classnames(
  width('w-11/12', 'lg:w-9/12'),
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  space('space-y-4')
)

const bottomWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  space('space-y-8'),
  width('w-full')
)
const hintWrapper = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  gap('gap-x-1')
)

export default function () {
  const { walletLoading, needNetworkChange } = useSnapshot(WalletStore)
  const { urlDomain, urlToken } = useUrlParams()

  if (urlDomain || urlToken)
    toast.warning(
      'You need to connect an anonymous account to use the token. Please connect an anonymous account that has never been used before and open the link again!'
    )

  const zkProofText =
    'In your wallet(s), you have NFTs that can point back to your identity (aka, getting doxxed). But with ZK proof, you can verify ownership of NFTs while staying pseudonymous.'

  return (
    <div className={walletContainer}>
      <div className={contentWrapper}>
        <HeaderText accent>First</HeaderText>
        <div className={bottomWrapper}>
          <BodyText center>
            Connect a wallet with NFTs to create a{' '}
            <AccentText color="text-accent">
              <ToolTip position="bottom" fitContainer text={zkProofText}>
                <span className={hintWrapper}>
                  <span className={textDecoration('underline')}>ZK proof</span>
                  <CharInCircle size={Sizes.Small} char="?" />
                </span>
              </ToolTip>
            </AccentText>
          </BodyText>
          <BodyText center color="text-primary">
            Keep in mind this project is still in Alpha
          </BodyText>
          <Button
            type="primary"
            loading={walletLoading}
            onClick={async () => {
              await WalletStore.changeNetworkOrConnect({
                clearCachedProvider: true,
                needNetworkChange,
              })
            }}
          >
            <span>
              {needNetworkChange ? 'Change network' : 'Connect a wallet'}
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}
