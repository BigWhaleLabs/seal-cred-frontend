import { Identities } from 'components/Identity'
import { SecondarySubheaderText } from 'components/Text'
import CardBlock from 'components/CardBlock'
import IdentityBadges from 'components/identities/IndentityBadges'
import Token from 'models/Token'

export default function TwitterIdentity({ tokens }: { tokens: Token[] }) {
  const identity = Identities.twitter
  return (
    <CardBlock border title={identity}>
      <SecondarySubheaderText big>@uwxan</SecondarySubheaderText>
      <IdentityBadges identity={identity} tokens={tokens} />
    </CardBlock>
  )
}
