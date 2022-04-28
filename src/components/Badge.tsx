import { BadgeText } from 'components/Text'
import { FC } from 'react'
import {
  alignItems,
  borderColor,
  borderRadius,
  borderWidth,
  classnames,
  display,
  justifyContent,
  padding,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import BadgeType from 'models/Badge'
import StreetCredStore from 'stores/StreetCredStore'

const badge = classnames(
  display('flex'),
  borderWidth('border'),
  borderColor('border-primary-dimmed'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  padding('py-1', 'px-2'),
  borderRadius('rounded')
)

const Badge: FC<{ address: string }> = ({ address }) => {
  const { contractNames } = useSnapshot(StreetCredStore)

  return (
    <>
      <div className={badge}>
        <BadgeText>{contractNames[address] || address}</BadgeText>
      </div>
    </>
  )
}

export default Badge
