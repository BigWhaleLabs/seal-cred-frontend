import { Group } from 'components/Section'
import { Identities } from 'components/Identity'
import { SecondarySubheaderText } from 'components/Text'
import CardBlock from 'components/CardBlock'
import CreateNFTBadge from 'components/identities/CreateNFTBadge'
import NFTBadge from './NFTBadge'
import Token from 'models/Token'
import useDosuIdentity from './useDosuIdentity'

export default function DosuIdentity({ tokens }: { tokens: Token[] }) {
  const identity = useDosuIdentity()
  if (!identity) return null
  const { templates, handle, onCreate } = identity
  const dosuTokens = tokens.filter(
    (token) => token.details.identity === Identities.dosu
  )

  return (
    <CardBlock border title={Identities.dosu}>
      <SecondarySubheaderText big>@{handle}</SecondarySubheaderText>
      {dosuTokens.length > 0 && (
        <Group title="NFT badges you have">
          {dosuTokens.map((token) => (
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
