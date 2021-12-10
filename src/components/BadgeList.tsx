import { FC } from 'react'
import { SubSecondaryText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import Badge from 'components/Badge'
import Token from 'models/Token'

const badgeBlock = classnames(
  'flex',
  'flex-col',
  'items-center',
  'space-y-4',
  'mt-8',
  'md:mt-10'
)
const badgeList = classnames(
  'grid',
  'gap-3',
  'md:gap-4',
  'grid-cols-1',
  'md:grid-cols-4',
  'justify-center',
  'items-center',
  'md:space-x-2'
)

export type BadgeListProps = { tokens: Token[] }

const BadgeList: FC<BadgeListProps> = ({ tokens }) => {
  return (
    <div className={badgeBlock}>
      <SubSecondaryText>NFT badges added:</SubSecondaryText>
      <div className={badgeList}>
        {tokens.map((token) => (
          <Badge key={token.template}>{token.details.name}</Badge>
        ))}
      </div>
    </div>
  )
}

export default BadgeList
