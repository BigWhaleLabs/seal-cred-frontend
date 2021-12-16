import { FC } from 'react'
import { classnames } from 'classnames/tailwind'
import Loading from 'components/Loading'

export type TokenType = 'unminted' | 'minted' | 'connected'

export interface TokenBadgeProps {
  type: TokenType
  loading?: boolean
}

const token = (type: TokenType) =>
  classnames(
    'flex',
    'flex-row',
    'space-x-2',
    'transition-colors',
    'text-white',
    'px-2',
    'capitalize',
    'rounded',
    'focus:outline-none',
    typeButton(type)
  )

const typeButton = (type: TokenType) => {
  return classnames(
    type === 'unminted'
      ? 'bg-accent'
      : type === 'minted'
      ? 'bg-success'
      : 'bg-error-light'
  )
}

const TokenButton: FC<TokenBadgeProps & React.HTMLProps<HTMLButtonElement>> = ({
  type,
  children,
  loading,
  ...rest
}) => {
  return (
    <button className={token(type)} {...rest} disabled={loading}>
      {loading && <Loading />}
      {typeof children === 'string' ? <span>{children}</span> : children}
    </button>
  )
}

export default TokenButton
