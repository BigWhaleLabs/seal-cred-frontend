import { BodyText, HeaderText } from 'components/Text'
import { space } from 'classnames/tailwind'
import Card from 'components/Card'

const creatingZkCard = space('space-y-6')

export default function () {
  return (
    <Card color="formal-accent" onlyWrap shadow nospace>
      <div className={creatingZkCard}>
        <HeaderText extraLeading>Creating ZK Proof</HeaderText>

        <BodyText>
          In your wallet(s), you have NFTs that can point back to your identity
          (aka, getting doxxed). But what if you can verify ownership of NFTs
          while staying pseudonymous?
        </BodyText>
        <BodyText>
          When you connect your wallet(s), we verify your NFTs. Then, we create
          ZK badges out of them.
        </BodyText>
      </div>
    </Card>
  )
}
