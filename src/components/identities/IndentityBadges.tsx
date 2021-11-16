import { Group, Section } from 'components/Section'
import { Identities } from 'components/Identity'
import { RegularText } from 'components/Text'
import Button, { ButtonType } from 'components/Button'
import Token from 'models/Token'
import useIdentityTemplates from 'components/identities/useIdentityTemplates'

export default function IdentityBadges({
  identity,
  tokens,
}: {
  identity: Identities
  tokens: Token[]
}) {
  const templates = useIdentityTemplates(identity)

  return (
    <>
      <Group title="NFT badges you have">
        {tokens.map((token) => (
          <Section>
            <RegularText>{token.template}</RegularText>
            <Button type={ButtonType.success}>Link</Button>
          </Section>
        ))}
      </Group>
      <Group title="NFT badges you can create">
        {templates.map((template) => (
          <Section key={template.type}>
            <RegularText>{template.name}</RegularText>
            <Button type={ButtonType.accent}>Create</Button>
          </Section>
        ))}
      </Group>
    </>
  )
}
