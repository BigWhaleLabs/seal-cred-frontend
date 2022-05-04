import { BadgeText, HeaderText } from 'components/Text'
import Button from 'components/Button'
import Card from 'components/Card'
import WalletStore from 'stores/WalletStore'
import ZkProofButton from 'components/ZkProofButton'
import classnames, {
  alignContent,
  alignItems,
  alignSelf,
  display,
  flexDirection,
  justifyContent,
  margin,
  padding,
  textAlign,
  width,
} from 'classnames/tailwind'
import configuredModal from 'helpers/web3Modal'

const proofingCardContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  textAlign('text-center'),
  width('w-4/5', 'lg:w-3/4'),
  margin('m-auto'),
  justifyContent('justify-center'),
  alignContent('content-center')
)

const connectWalletButtonContainer = classnames(
  display('flex'),
  margin('mt-8'),
  justifyContent('justify-center')
)

export default function ProofingCard() {
  return (
    <div>
      <Card shadow proofing color="yellow">
        <div className={proofingCardContainer}>
          <div className={margin('mb-4')}>
            <HeaderText yellow>First</HeaderText>
          </div>
          <BadgeText>Connect a wallet with NFTs to create ZK proof.</BadgeText>
          <div className={connectWalletButtonContainer}>
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
        </div>
      </Card>
    </div>
  )
}
