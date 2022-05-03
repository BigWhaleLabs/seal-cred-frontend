import { BodyText, HeaderText } from 'components/Text'
import Button from 'components/Button'
import Card from 'components/Card'

function Main() {
  return (
    <Card shadow color="yellow">
      <HeaderText>Build your pseudonymous identity with ZK badges</HeaderText>
      <BodyText>
        StreetCred allows you to experience the world pseudonymously with ZK
        badges. This means you can prove ownership of an NFT without it tracing
        back to you.
      </BodyText>
      <Button colors="primary" />
    </Card>
  )
}

export default Main
