import { BodyText } from 'components/Text'
import { UserAgent, userAgent } from 'helpers/userAgent'
import { useState } from 'react'
import Button from 'components/Button'
import Card from 'components/Card'
import EthStore from 'stores/EthStore'
import Popup from 'components/Popup'

export default function AddIdentity() {
  const [loading, setLoading] = useState(false)
  const isSafari = userAgent() === UserAgent.Safari
  return (
    <Card>
      <BodyText>Link another identity</BodyText>
      {EthStore.isMetaMaskInstalled() ? (
        <Button
          color="primary"
          loading={loading}
          onClick={async () => {
            setLoading(true)
            try {
              await EthStore.fetchAccounts()
            } catch (error) {
              console.error(error)
            } finally {
              setLoading(false)
            }
          }}
        >
          <img src="/img/metamask.svg" alt="metamask" />
          <span>Metamask</span>
        </Button>
      ) : (
        <Popup
          activator={
            <Button color="primary" loading={loading}>
              <img src="/img/metamask.svg" alt="metamask" />
              <span>Metamask</span>
            </Button>
          }
          title={
            isSafari ? 'MetaMask is not supported' : 'MetaMask is not installed'
          }
          body={
            isSafari
              ? 'Safari does not support MetaMask, please use another browser'
              : 'To use Web3 tech, please, install MetaMask extension for your browser'
          }
          confirmTitle="Okay, thanks"
        />
      )}
    </Card>
  )
}
