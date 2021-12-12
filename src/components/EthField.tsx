import { AccentText } from 'components/Text'
import { FC } from 'react'
import { classnames } from 'classnames/tailwind'

const ethFielt = classnames(
  'py-4',
  'px-6',
  'rounded-2xl',
  'bg-accent-light',
  'text-center',
  'break-words',
  'transition-colors'
)

const EthField: FC<{ address?: string }> = ({ address }) => {
  return (
    <div className={ethFielt}>
      <AccentText>{address}</AccentText>
    </div>
  )
}
export default EthField
