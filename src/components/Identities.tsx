import { SubheaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { useMetaMask } from 'metamask-react'
import Button from 'components/Button'
import Card from 'components/Card'

const container = classnames(
  'grid',
  'grid-cols-1',
  'sm:grid-cols-2',
  'lg:grid-cols-3',
  'gap-4'
)

export default function Identities() {
  const { connect: connectMetamask } = useMetaMask()

  return (
    <div className={container}>
      <Card>
        <SubheaderText>Link another identity</SubheaderText>
        <Button type="primary" onClick={connectMetamask}>
          <img src="/img/metamask.svg" alt="metamask" />
          <span>Metamask</span>
        </Button>
      </Card>
    </div>
  )
}
