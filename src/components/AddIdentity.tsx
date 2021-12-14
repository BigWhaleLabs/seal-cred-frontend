import { BodyText } from 'components/Text'
import { useMetaMask } from 'metamask-react'
import Button from 'components/Button'
import Card from 'components/Card'

export default function AddIdentity() {
  const { connect: connectMetamask, status } = useMetaMask()

  return (
    <Card>
      <BodyText>Link another identity</BodyText>
      <Button
        disabled={status === 'connecting'}
        type="primary"
        onClick={connectMetamask}
      >
        <img src="/img/metamask.svg" alt="metamask" />
        <span>{status === 'connecting' ? 'Connecting' : 'Metamask'}</span>
      </Button>
    </Card>
  )
}
