import { BodyText } from 'components/Text'
import Button from 'components/Button'
import Card from 'components/Card'

export default function AddIdentity() {
  return (
    <Card>
      <BodyText>Link another identity</BodyText>
      <Button disabled={status === 'connecting'} type="primary">
        <img src="/img/metamask.svg" alt="metamask" />
        <span>Metamask</span>
      </Button>
    </Card>
  )
}
