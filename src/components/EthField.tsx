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

const EthField: FC = () => {
  const ethAddress = '0xdDd0bacA576a3a6710806245a834d719e458D614'
  return (
    <div className={ethFielt}>
      <AccentText>{ethAddress}</AccentText>
    </div>
  )
}
export default EthField
