import { BadgeText, HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignContent,
  display,
  flexDirection,
  justifyContent,
  margin,
  textAlign,
} from 'classnames/tailwind'
import configuredModal from 'helpers/web3Modal'

const proofingCardContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  textAlign('text-center'),
  justifyContent('justify-center'),
  alignContent('content-center'),
  margin('my-36'),
  margin('mx-16')
)

const firstHeaderContainer = classnames(margin('mb-4'))

const connectWalletButtonContainer = classnames(
  display('flex'),
  margin('mt-8'),
  justifyContent('justify-center')
)

export default function Initial() {
  const { walletLoading } = useSnapshot(WalletStore)
  return (
    <div className={proofingCardContainer}>
      <div className={firstHeaderContainer}>
        <HeaderText color="yellow">First</HeaderText>
      </div>
      <BadgeText>Connect a wallet with NFTs to create ZK proof.</BadgeText>
      <div className={connectWalletButtonContainer}>
        <Button
          loading={walletLoading}
          colors="primary"
          onClick={async () => {
            configuredModal.clearCachedProvider()
            await WalletStore.connect()
          }}
        >
          Connect a wallet
        </Button>
      </div>
    </div>
  )
}
