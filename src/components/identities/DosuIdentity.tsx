import { Identities } from 'components/Identity'
import { SecondarySubheaderText } from 'components/Text'
import CardBlock from 'components/CardBlock'
import CreateBadgeList from 'components/identities/CreateBadgeList'
import CreatedBadgeList from 'components/identities/CreatedBadgeList'
import Token from 'models/Token'
import useDosuIdentity from 'components/identities/useDosuIdentity'

export default function DosuIdentity({
  tokens,
  onAddToken,
}: {
  tokens: Token[]
  onAddToken: (token: Token) => void
}) {
  const identity = useDosuIdentity(onAddToken)
  if (!identity) return null
  const { templates, handle, onCreate } = identity
  const usedTemplates = new Set(tokens.map((t) => t.template))
  const dosuTokens = tokens.filter(
    (token) => token.details.identity === Identities.dosu
  )
  const dosuTemplates = templates.filter(
    (template) => !usedTemplates.has(template.type)
  )

  return (
    <CardBlock border tiny title={Identities.dosu}>
      <SecondarySubheaderText big>@{handle}</SecondarySubheaderText>
      <CreatedBadgeList tokens={dosuTokens} />
      <CreateBadgeList templates={dosuTemplates} onCreate={onCreate} />
    </CardBlock>
  )
}
