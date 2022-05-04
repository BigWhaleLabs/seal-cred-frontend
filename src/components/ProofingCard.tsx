import { BadgeText, HeaderText } from 'components/Text'
import Button from 'components/Button'
import Card from 'components/Card'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  borderWidth,
  display,
  flexDirection,
  justifyContent,
  margin,
  padding,
  textAlign,
} from 'classnames/tailwind'
import configuredModal from 'helpers/web3Modal'

const proofingCardContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  textAlign('text-center'),
  justifyContent('justify-center')
)

export default function ProofingCard() {
  return (
    <Card shadow color="yellow">
      <div className={proofingCardContainer}>
        <HeaderText color="yellow">First</HeaderText>
        <BadgeText>Connect a wallet with NFTs to create ZK proof.</BadgeText>
        <Button
          colors="primary"
          onClick={async () => {
            configuredModal.clearCachedProvider()
            await WalletStore.connect()
          }}
        >
          Connect a wallet
        </Button>
      </div>
    </Card>
  )
}
