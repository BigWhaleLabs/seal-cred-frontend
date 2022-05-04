import { BadgeText, HeaderText } from 'components/Text'
import Card from 'components/Card'
import WalletStore from 'stores/WalletStore'
import classnames, {
  backgroundColor,
  cursor,
  display,
  flexDirection,
  lineHeight,
  margin,
  padding,
} from 'classnames/tailwind'
import configuredModal from 'helpers/web3Modal'

const badgingCardContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  lineHeight('leading-5', 'lg:leading-6')
)
const headerTextContainer = classnames(margin('mt-2'))

const badgingDescriptionContainer = classnames(
  margin('mt-6'),
  padding('p-4'),
  backgroundColor('bg-blue-200')
)

const anonWalletContainer = classnames(cursor('cursor-pointer'), margin('mt-4'))

export default function BadgingCard() {
  return (
    <Card shadow color="pink">
      <div className={badgingCardContainer}>
        <BadgeText pink>Then</BadgeText>
        <div className={headerTextContainer}>
          <HeaderText size="2xl">
            Once you've created ZK proof, create badges for your anonymous
            wallet.
          </HeaderText>
        </div>
        <div className={badgingDescriptionContainer}>
          <BadgeText>
            You must disconnect your first wallet after ZK proof is made, and
            then reconnect with a new one for the magic to work.
          </BadgeText>
          <div
            className={anonWalletContainer}
            onClick={async () => {
              configuredModal.clearCachedProvider()
              await WalletStore.connect()
            }}
          >
            <GradientText>Connect your anonymous wallet {'>'}</GradientText>
          </div>
        </div>
      </div>
    </Card>
  )
}
