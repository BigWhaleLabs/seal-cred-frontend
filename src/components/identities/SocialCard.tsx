import { SecondaryText } from 'components/Text'
import CardBlock from 'components/CardBlock'
import ConnectMetamask from 'components/identities/ConnectMetamask'

const SocialCard = () => {
  return (
    <CardBlock border tiny>
      <SecondaryText>Link identity</SecondaryText>
      <ConnectMetamask />
    </CardBlock>
  )
}

export default SocialCard
