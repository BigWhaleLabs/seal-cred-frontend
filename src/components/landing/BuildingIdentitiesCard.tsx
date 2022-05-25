import { BodyText, HeaderText } from 'components/Text'
import Card from 'components/Card'
import GetStartedButton from 'components/GetStartedButton'

export default function () {
  return (
    <Card color="formal-accent" onlyWrap shadow>
      <HeaderText extraLeading>
        Building your identities with ZK Badges
      </HeaderText>
      <BodyText>
        Once you have ZK proof, you can add create ZK badges for an anonymous
        wallet.
      </BodyText>
      <BodyText>
        Zk badges verify you own an NFT but leaves no bread crumbs back to your
        personal wallets.
      </BodyText>
      <GetStartedButton>Connect wallet to start</GetStartedButton>
    </Card>
  )
}
