import { RegularText } from 'components/Text'
import { Section } from 'components/Section'
import LinkButton from 'components/identities/LinkButton'
import Token from 'models/Token'

export default function NFTBadge({ token }: { token: Token }) {
  return (
    <Section key={token.template}>
      <RegularText>{token.details.name}</RegularText>
      <LinkButton template={token.template} status={token.status} />
    </Section>
  )
}
