import { BadgeText, HeaderText } from 'components/Text'
import Button from 'components/Button'
import Card from 'components/Card'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  justifyContent,
  margin,
  textAlign,
} from 'classnames/tailwind'
import configuredModal from 'helpers/web3Modal'

const proofingCardContainer = classnames(
  textAlign('text-center'),
  alignItems('items-center'),
  display('flex'),
  justifyContent('justify-center'),
  margin('m-0')
)

export default function ProofingCard() {
  return (
    <div className={proofingCardContainer}>
      <Card shadow color="yellow">
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
      </Card>
    </div>
  )
}
