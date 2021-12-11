import { Group } from 'components/Section'
import NFTBadge from 'components/identities/NFTBadge'
import Token from 'models/Token'

export default function CreateBadgeList({ tokens }: { tokens: Token[] }) {
  if (tokens.length === 0) return null
  return (
    <Group title="NFT badges you have">
      {tokens.map((token) => (
        <NFTBadge key={token.template} token={token} />
      ))}
    </Group>
  )
}
