import { Group, Section } from 'components/Section'
import { Identities } from 'components/Identity'
import { RegularText } from 'components/Text'
import BadgeButton from 'components/identities/BadgeButton'
import LinkButton from 'components/identities/LinkButton'
import Template from 'models/Template'
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
  const usedTemplates = new Set(tokens.map((token) => token.template))
  const identityTokens = tokens.filter((token) => templates.has(token.template))
  const availableTemplates = Array.from(templates.values()).filter(
    (t) => !usedTemplates.has(t.type)
  )

  return (
    <>
      {identityTokens.length > 0 && (
        <Group title="NFT badges you have">
          {identityTokens.map((token) => (
            <Section key={token.template}>
              <RegularText>
                {(templates.get(token.template) as Template).name}
              </RegularText>
              <LinkButton template={token.template} status={token.status} />
            </Section>
          ))}
        </Group>
      )}
      {availableTemplates.length > 0 && (
        <Group title="NFT badges you can create">
          {availableTemplates.map((template) => (
            <Section key={template.type}>
              <RegularText>{template.name}</RegularText>
              <BadgeButton template={template.type} />
            </Section>
          ))}
        </Group>
      )}
    </>
  )
}
