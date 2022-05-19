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
  space,
  width,
} from 'classnames/tailwind'

const walletContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  height('h-full')
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
  const { walletLoading } = useSnapshot(WalletStore)
  return (
    <div className={walletContainer}>
      <div className={contentWrapper}>
        <HeaderText accent>First</HeaderText>
        <div className={bottomWrapper}>
          <BodyText center>
            Connect a wallet with supported NFTs to create ZK proofs.
          </BodyText>
          <Button
            primary
            loading={walletLoading}
            onClick={async () => {
              await WalletStore.connect(true)
            }}
          >
            <span>Connect a wallet</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
