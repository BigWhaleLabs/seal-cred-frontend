import { Group } from 'components/Section'
import { Identities } from 'components/Identity'
import { SecondarySubheaderText } from 'components/Text'
import CardBlock from 'components/CardBlock'
import CreateNFTBadge from './CreateNFTBadge'
import NFTBadge from './NFTBadge'
import Token from 'models/Token'
import useEtheriumIdentity from './useEtheriumIdentity'

function shortAddress(address: string) {
  return address.slice(0, 5) + '...' + address.slice(-5)
}

export default function EthIdentity({ tokens }: { tokens: Token[] }) {
  const identity = useEtheriumIdentity()
  if (!identity) return null
  const { templates, onCreate, address } = identity
  const ethTokens = tokens.filter(
    (token) => token.details.identity === Identities.eth
  )

  return (
    <CardBlock border title={Identities.eth}>
      <SecondarySubheaderText big>
        {shortAddress(address)}
      </SecondarySubheaderText>
      {ethTokens.length > 0 && (
        <Group title="NFT badges you have">
          {ethTokens.map((token) => (
            <NFTBadge key={token.template} token={token} />
          ))}
        </Group>
      )}
      {templates.length > 0 && (
        <Group title="NFT badges you can create">
          {templates.map((template) => (
            <CreateNFTBadge
              key={template.type}
              template={template}
              onCreate={onCreate}
            />
          ))}
        </Group>
      )}
    </CardBlock>
  )
}
