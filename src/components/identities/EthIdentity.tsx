import { Identities } from 'components/Identity'
import { SecondarySubheaderText } from 'components/Text'
import CardBlock from 'components/CardBlock'
import CreateBadgeList from 'components/identities/CreateBadgeList'
import CreatedBadgeList from 'components/identities/CreatedBadgeList'
import Token from 'models/Token'
import useEtheriumIdentity from 'components/identities/useEtheriumIdentity'

function shortAddress(address: string) {
  return address.slice(0, 5) + '...' + address.slice(-5)
}

export default function EthIdentity({
  tokens,
  onAddToken,
}: {
  tokens: Token[]
  onAddToken: (token: Token) => void
}) {
  const identity = useEtheriumIdentity(onAddToken)
  if (!identity) return null
  const { templates, onCreate, address } = identity
  const usedTemplates = new Set(tokens.map((t) => t.template))
  const ethTokens = tokens.filter(
    (token) => token.details.identity === Identities.eth
  )
  const ethTemplates = templates.filter(
    (template) => !usedTemplates.has(template.type)
  )

  return (
    <CardBlock border title={Identities.eth}>
      <SecondarySubheaderText big>
        {shortAddress(address)}
      </SecondarySubheaderText>
      <CreatedBadgeList tokens={ethTokens} />
      <CreateBadgeList templates={ethTemplates} onCreate={onCreate} />
    </CardBlock>
  )
}
