import { AccentText, BodyText, HeaderText } from 'components/Text'
import Button from 'components/Button'
import Card from 'components/Card'

function Main() {
  return (
    <Card shadow color="yellow">
      <HeaderText size="4xl">
        Build your pseudonymous identity with ZK badges
      </HeaderText>
      <BodyText size="base">
        <AccentText color="text-yellow">SealCred</AccentText> allows you to
        experience the world pseudonymously with ZK badges. This means you can
        prove ownership of an NFT without it tracing back to you.
      </BodyText>
      <Button colors="primary" />
    </Card>
  )
}

export default Main
