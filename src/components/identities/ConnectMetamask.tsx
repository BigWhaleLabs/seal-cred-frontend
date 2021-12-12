import { SecondarySubheaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { useMetaMask } from 'metamask-react'

const identityBlock = () =>
  classnames(
    'flex',
    'items-center',
    'space-x-2',
    'focus:outline-none',
    'transition-colors',
    'w-full',
    'cursor-pointer',
    'my-4'
  )

export default function ConnectMetamask() {
  const { connect } = useMetaMask()
  function onClick() {
    void connect()
  }
  return (
    <button className={identityBlock()} onClick={onClick}>
      <img src={`/img/metamask.svg`} alt="metamask" />
      <SecondarySubheaderText>metamask</SecondarySubheaderText>
    </button>
  )
}
