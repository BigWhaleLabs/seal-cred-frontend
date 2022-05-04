import { BadgeText, GradientText, HeaderText } from 'components/Text'
import Card from 'components/Card'
import classnames, {
  backgroundColor,
  display,
  margin,
  padding,
} from 'classnames/tailwind'

const badgingCardContainer = classnames(display('flex'), margin('m-0'))

const badgingDescriptionContainer = classnames(
  padding('p-4'),
  backgroundColor('bg-indigo-900')
)

export default function BadgingCard() {
  return (
    <div className={badgingCardContainer}>
      <Card shadow color="pink">
        <BadgeText color="pink">Then</BadgeText>
        <HeaderText text="small">
          Once you've created ZK proof, create badges for your anonymous wallet.
        </HeaderText>
        <div className={badgingDescriptionContainer}>
          <BadgeText>
            You must disconnect your first wallet after ZK proof is made, and
            then reconnect with a new one for the magic to work.
          </BadgeText>
          <GradientText>Connect your anonymous wallet ></GradientText>
        </div>
      </Card>
    </div>
  )
}
