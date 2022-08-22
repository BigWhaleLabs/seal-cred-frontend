import { BodyText, HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  height,
  justifyContent,
  margin,
  space,
  width,
} from 'classnames/tailwind'

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

export default function () {
  const { walletLoading, needNetworkChange } = useSnapshot(WalletStore)

  return (
    <div className={walletContainer}>
      <div className={contentWrapper}>
        <HeaderText accent>First</HeaderText>
        <div className={bottomWrapper}>
          <BodyText center>
            Connect a wallet with NFTs to create a ZK proof.
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
