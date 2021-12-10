import { SecondaryText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import Button, { ButtonType } from 'components/Button'
import UserStore from 'stores/UserStore'

const actions = classnames('flex', 'items-center', 'md:space-x-4')

const { ethereum } = window

const MetaMask = () => {
  function connectByMetamask() {
    void UserStore.connect()
  }

  if (!ethereum) {
    return <SecondaryText>Not found ethereum!</SecondaryText>
  }

  if (!ethereum && ethereum.isConnected()) {
    return <SecondaryText>Loading...</SecondaryText>
  }

  if (!ethereum.isMetaMask)
    return <SecondaryText>Install MetaMask</SecondaryText>

  return (
    <div className={actions}>
      <Button type={ButtonType.primary} onClick={connectByMetamask}>
        Connect to MetaMask
      </Button>
    </div>
  )
}

export default MetaMask
