import { AccentText, BodyText, HeaderText } from 'components/Text'
import Card from 'components/Card'
import GetStartedButton from 'components/GetStartedButton'
import classnames, { margin } from 'classnames/tailwind'

const initialHeaderText = classnames(margin('mt-2'), margin('mb-4'))
const getStartedButton = classnames(margin('mt-6'), margin('mb-2'))

export default function ({ showSpinner }: { showSpinner?: boolean }) {
  return (
    <Card
      shadow
      color="accent"
      onlyWrap
      spinner={showSpinner ? 'One Identity to rule them all' : undefined}
    >
      <div className={initialHeaderText}>
        <HeaderText extraLeading>
          Build your pseudonymous identity with ZK badges
        </HeaderText>
      </div>
      <BodyText>
        <AccentText color="text-accent">SealCred</AccentText> allows you to
        experience the world pseudonymously with ZK badges. This means you can
        prove ownership of an NFT without it tracing back to you.
      </BodyText>
      <div className={getStartedButton}>
        <GetStartedButton />
      </div>
    </Card>
  )
}
