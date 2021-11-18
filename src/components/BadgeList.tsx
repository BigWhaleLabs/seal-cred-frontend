import { FC } from 'react'
import { SubSecondaryText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import Badge from 'components/Badge'
import Template from 'models/Template'
import Token from 'models/Token'
import useIdentityTemplates from 'components/identities/useIdentityTemplates'

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
  const templates = useIdentityTemplates()
  return (
    <div className={badgeBlock}>
      <SubSecondaryText>NFT badges added:</SubSecondaryText>
      <div className={badgeList}>
        {tokens
          .filter((token) => templates.has(token.template))
          .map((token) => (
            <Badge key={token.template}>
              {(templates.get(token.template) as Template).name}
            </Badge>
          ))}
      </div>
    </div>
  )
}

export default BadgeList
