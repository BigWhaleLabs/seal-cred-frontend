import { SecondaryText } from 'components/Text'
import {
  createBadge,
  fetchTokens,
  requestNonce,
  verifyNonce,
} from 'helpers/api'
import { useState } from 'react'
import Button, { ButtonType } from 'components/Button'
import Web3 from 'web3'

const { ethereum } = window

const MetaMask = () => {
  const [isConnected, useIsConnected] = useState(
    ethereum && ethereum.isConnected()
  )
  const [currentAccount, useCurrentAccounts] = useState(
    localStorage.getItem('eth') || ''
  )
  const setCurrentAccount = (account: string) => {
    localStorage.setItem('eth', account)
    useCurrentAccounts(account)
  }

  const setSign = (sign: string) => {
    localStorage.setItem('signaddress', sign)
  }

  const isMetaMaskInstalled = () => {
    const { ethereum } = window
    if (!ethereum) return false
    return Boolean(ethereum && ethereum.isMetaMask)
  }
  const isEthereumConnected = () => {
    const { ethereum } = window
    if (!ethereum) return false
    return ethereum.isConnected()
  }

  // Create a sign
  const signEth = async () => {
    const { ethereum } = window
    if (!ethereum) return
    const { nonce } = await requestNonce()
    const exampleMessage = `Hi there! Your special nonce: ${nonce}`
    try {
      const from = currentAccount
      const msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`
      const sign = await ethereum.request({
        method: 'personal_sign',
        params: [msg, from, 'Example password'],
      })
      setSign(sign)
      await verifyNonce(nonce)
    } catch (err) {
      console.error(err)
    }
  }
  // Create a new eth address with private key
  const createAccount = async () => {
    const web3 = new Web3('https://cloudflare-eth.com')
    try {
      const data = await web3.eth.accounts.create()
      setCurrentAccount(data.address)
      await signEth()
    } catch (err) {
      console.error(err)
    }
  }
  // Connect website to MetaMask
  const connectToMetaMask = async () => {
    if (!isMetaMaskInstalled()) return
    if (!ethereum) return
    try {
      await ethereum.request({
        method: 'eth_requestAccounts',
      })
      await ethereum
        .request({ method: 'eth_accounts' })
        .then((res: string[]) => setCurrentAccount(res[0]))
      useIsConnected(true)
    } catch (error) {
      console.error(error)
      useIsConnected(false)
    }
  }

  // let currentAccount: any = null
  // const handleAccountsChanged = (accounts: any[]) => {
  //   console.log('handleAccountsChanged: ', accounts)
  //   if (accounts.length === 0) {
  //     console.log('Please connect to MetaMask.')
  //     useIsConnected(false)
  //   } else if (accounts[0] !== currentAccount) {
  //     useCurrentAccounts(accounts[0])
  //     // currentAccount = accounts[0]
  //     useIsConnected(true)
  //   }
  // }

  // ethereum
  //   .request({ method: 'eth_accounts' })
  //   .then(handleAccountsChanged)
  //   .catch((err: Error) => {
  //     console.error(err)
  //   })

  const handleSign = ({
    publicAddress,
    nonce,
  }: {
    publicAddress: string
    nonce: string
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Personal = require('web3-eth-personal')

    // "Personal.providers.givenProvider" will be set if in an Ethereum supported browser.
    const personal = new Personal(
      Personal.givenProvider || 'ws://some.local-or-remote.node:8546'
    )

    // or using the web3 umbrella package

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Web3 = require('web3')
    const web3 = new Web3(Web3.givenProvider || 'https://cloudflare-eth.com')

    return new Promise((resolve, reject) =>
      web3.personal.sign(
        web3.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
        publicAddress,
        (err: Error, signature: string) => {
          if (err) return reject(err)
          return resolve({ publicAddress, signature })
        }
      )
    )
  }

  const fetching = async () => {
    const address: string = currentAccount
    const data = await fetchTokens(address)
    console.log(`Fetch templates for user (${currentAccount}): `, data)
  }

  const twitterBadge = async () => {
    const data = await createBadge('twitter_5y_old_account')
    console.log(`Create twitter widget for user (${currentAccount}): `, data)
  }

  const FirstScreen = () => {
    return isConnected ? (
      <>
        {!isMetaMaskInstalled() ? (
          <SecondaryText>Install MetaMask</SecondaryText>
        ) : (
          <>
            <Button
              type={ButtonType.primary}
              onClick={() =>
                connectToMetaMask().then(() => ethereum.isConnected())
              }
            >
              Connect to MetaMask
            </Button>
            <Button type={ButtonType.error} onClick={() => createAccount()}>
              Create account
            </Button>
          </>
        )}
      </>
    ) : null
  }

  const BadgesScreen = () => {
    return localStorage.getItem('signaddress') ? (
      <>
        <Button type={ButtonType.success} onClick={() => fetching()}>
          Fetching
        </Button>
        <Button type={ButtonType.accent} onClick={() => twitterBadge()}>
          Create twitter badge
        </Button>
      </>
    ) : isConnected ? (
      <Button
        type={ButtonType.error}
        onClick={() => (isConnected ? signEth() : null)}
      >
        ETH Sign
      </Button>
    ) : null
  }

  return (
    <>
      <SecondaryText>
        {isMetaMaskInstalled() ? 'Metamask installed' : 'There is no MetaMask'}
      </SecondaryText>
      <FirstScreen />
      <BadgesScreen />
    </>
  )
}

export default MetaMask
