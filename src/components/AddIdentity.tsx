import { BodyText } from 'components/Text'
import { useMetaMask } from 'metamask-react'
import Button from 'components/Button'
import Card from 'components/Card'

export default function AddIdentity() {
  const { connect: connectMetamask } = useMetaMask()

  return (
    <Card>
      <BodyText>Link another identity</BodyText>
      <Button type="primary" onClick={connectMetamask}>
        <img src="/img/metamask.svg" alt="metamask" />
        <span>Metamask</span>
      </Button>
    </Card>
  )
}
