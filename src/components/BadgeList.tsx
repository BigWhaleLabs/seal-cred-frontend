import { FC } from 'react'
import { SubSecondaryText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import Badge from 'components/Badge'

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

const BadgeList: FC = () => {
  return (
    <div className={badgeBlock}>
      <SubSecondaryText>NFT badges added:</SubSecondaryText>
      <div className={badgeList}>
        <Badge>100M YouTube followers</Badge>
        <Badge>ETH address 10y old</Badge>
        <Badge>10M followers on Twitter</Badge>
        <Badge>10000 ETH on address</Badge>
      </div>
    </div>
  )
}

export default BadgeList
