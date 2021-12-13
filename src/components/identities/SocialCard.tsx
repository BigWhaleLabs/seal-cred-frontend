import { SecondaryText } from 'components/Text'
import CardBlock from 'components/Card'
import ConnectMetamask from 'components/identities/ConnectMetamask'

const SocialCard = () => {
  return (
    <CardBlock border>
      <SecondaryText>Link identity</SecondaryText>
      <ConnectMetamask />
    </CardBlock>
  )
}

export default SocialCard
