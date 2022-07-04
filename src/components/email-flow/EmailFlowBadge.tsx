import { BodyText, GradientSpan, HeaderText } from 'components/Text'
import BadgesOwnedForContract from 'components/badges/BadgesOwnedForContract'
import Button from 'components/Button'

export default function ({
  contractAddress,
  resetEmail,
}: {
  contractAddress: string
  resetEmail: () => void
}) {
  return (
    <>
      <HeaderText extraLeading>Congrats!</HeaderText>
      <BodyText>You’ve minted a zkBadge verifying your work email!</BodyText>
      <BadgesOwnedForContract contractAddress={contractAddress} />
      <Button fullWidth center small type="secondary" onClick={resetEmail}>
        <GradientSpan bold gradientFrom="from-secondary" gradientTo="to-accent">
          Try another email
        </GradientSpan>
      </Button>
    </>
  )
}
