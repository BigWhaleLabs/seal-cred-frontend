import { SecondaryText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { useState } from 'react'
import Button, { ButtonType } from 'components/Button'
import UserStore from 'stores/UserStore'

const actions = classnames('flex', 'items-center', 'md:space-x-4')

const { ethereum } = window

const MetaMask = () => {
  const [isConnected] = useState(ethereum && ethereum.isConnected())

  function connectByMetamask() {
    void UserStore.connect()
  }

  if (!ethereum) {
    return <SecondaryText>Not found ethereum!</SecondaryText>
  }

  if (!isConnected) {
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
