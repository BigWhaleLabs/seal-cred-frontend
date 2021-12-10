import { FC } from 'react'
import { SecondarySubheaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'

export enum Identities {
  twitter = 'Twitter',
  linkedin = 'Linkedin',
  rarible = 'Rarible',
  eth = 'ETH',
  dosu = 'Dosu',
}

export interface IdentityProps {
  name: Identities
  emphasis?: boolean
  onClick?: () => void
}

const identityBlock = (emphasis: boolean, clickable: boolean) =>
  classnames(
    'flex',
    'items-center',
    'space-x-2',
    'focus:outline-none',
    'transition-colors',
    'w-full',
    emphasis ? 'mb-2' : 'my-4',
    clickable ? 'cursor-pointer' : 'cursor-default'
  )

const Identity: FC<IdentityProps> = ({ name, emphasis, onClick }) => {
  const clickable = !!onClick
  return (
    <button
      className={identityBlock(emphasis || false, clickable)}
      onClick={onClick}
    >
      <img src={`/img/${name.toLowerCase()}.svg`} alt={name} />
      <SecondarySubheaderText>{name}</SecondarySubheaderText>
    </button>
  )
}

export default Identity
