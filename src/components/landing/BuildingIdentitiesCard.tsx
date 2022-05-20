import { BodyText, HeaderText } from 'components/Text'
import { space } from 'classnames/tailwind'
import Card from 'components/Card'
import GetStartedButton from 'components/GetStartedButton'

const identityCardWrapper = space('space-y-6')

export default function () {
  return (
    <Card color="formal-accent" onlyWrap shadow>
      <div className={identityCardWrapper}>
        <HeaderText extraLeading>
          Building your identities with ZK Badges
        </HeaderText>
        <BodyText>
          Once you have ZK proof, you can add create ZK badges for an anonymous
          wallet. Zk badges verify you own an NFT but leaves no bread crumbs
          back to your personal wallets.
        </BodyText>
        <GetStartedButton />
      </div>
    </Card>
  )
}
