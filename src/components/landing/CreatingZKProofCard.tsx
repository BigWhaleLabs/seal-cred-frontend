import { BodyText, HeaderText } from 'components/Text'
import Card from 'components/Card'
import classnames, { margin } from 'classnames/tailwind'

const cardHeader = classnames(margin('mb-6'))
const bottomBodyText = classnames(margin('mt-6'))

export default function () {
  return (
    <Card color="white" onlyWrap shadow>
      <div className={cardHeader}>
        <HeaderText size="4xl" leading={11}>
          Creating ZK Proof
        </HeaderText>
      </div>
      <BodyText size="base">
        In your wallet(s), you have NFTs that can point back to your identity
        (aka, getting doxxed). But what if you can verify ownership of NFTs
        while staying pseudonymous?
      </BodyText>
      <div className={bottomBodyText}>
        <BodyText size="base">
          When you connect your wallet(s), we verify your NFTs. Then, we create
          ZK badges out of them.
        </BodyText>
      </div>
    </Card>
  )
}
