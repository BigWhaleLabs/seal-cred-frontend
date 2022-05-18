import { BodyText, HeaderText } from 'components/Text'
import Card from 'components/Card'
import GetStartedButton from 'components/GetStartedButton'
import classnames, { margin } from 'classnames/tailwind'

const cardHeader = classnames(margin('mb-6'))
const bottomBodyText = classnames(margin('mt-6'))

export default function () {
  return (
    <Card color="white" onlyWrap shadow>
      <div className={cardHeader}>
        <HeaderText leading>Building your identities with ZK Badges</HeaderText>
      </div>
      <BodyText>
        Once you have ZK proof, you can add create ZK badges for an anonymous
        wallet. Zk badges verify you own an NFT but leaves no bread crumbs back
        to your personal wallets.
      </BodyText>
      <div className={bottomBodyText}>
        <GetStartedButton />
      </div>
    </Card>
  )
}
