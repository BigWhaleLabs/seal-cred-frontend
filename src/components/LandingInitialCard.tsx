import { AccentText, BodyText, HeaderText } from 'components/Text'
import Card from 'components/Card'
import GetStartedButton from 'components/GetStartedButton'
import classnames, { margin } from 'classnames/tailwind'

const initialHeaderText = classnames(margin('mt-2'), margin('mb-4'))
const getStartedButton = classnames(margin('mt-6'), margin('mb-2'))

function LandingInitialCard({ showSpinner }: { showSpinner?: boolean }) {
  return (
    <Card
      shadow
      color="primary"
      onlyWrap
      spinner={showSpinner ? 'One Identity to rule them all' : undefined}
    >
      <div className={initialHeaderText}>
        <HeaderText size="4xl" leading={11}>
          Build your pseudonymous identity with ZK badges
        </HeaderText>
      </div>
      <BodyText size="base" leading={6}>
        <AccentText color="text-primary">SealCred</AccentText> allows you to
        experience the world pseudonymously with ZK badges. This means you can
        prove ownership of an NFT without it tracing back to you.
      </BodyText>
      <div className={getStartedButton}>
        <GetStartedButton />
      </div>
    </Card>
  )
}

export default LandingInitialCard
