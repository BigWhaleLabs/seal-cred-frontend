import { FC } from 'react'
import classnames, { display, flexDirection, space } from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-2')
)

const ContractListContainer: FC = ({ children }) => {
  return <div className={container}>{children}</div>
}

export default ContractListContainer
