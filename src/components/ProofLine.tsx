import { FC } from 'react'

import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  fontSize,
  fontWeight,
  height,
  justifyContent,
  padding,
  space,
} from 'classnames/tailwind'

const contractContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  justifyContent('justify-between'),
  space('space-x-2'),
  backgroundColor('bg-blue-700'),
  borderRadius('rounded-lg'),
  height('h-8'),
  padding('px-4', 'py-2'),
  fontSize('text-sm'),
  fontWeight('font-bold')
)

const ProofLine: FC = ({ children }) => {
  return <div className={contractContainer}>{children}</div>
}

export default ProofLine
