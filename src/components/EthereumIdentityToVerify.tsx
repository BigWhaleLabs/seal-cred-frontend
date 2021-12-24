import { BodyText, LargerText } from 'components/Text'
import { Buffer } from 'buffer'
import { FC, useState } from 'react'
import { classnames } from 'classnames/tailwind'
import Button from 'components/Button'
import Card from 'components/Card'
import Popup from 'components/Popup'
import PublicAccountStore from 'stores/PublicAccountStore'
import axios from 'axios'
import identities from 'models/identities'

interface EthereumIdentityToVerifyProps {
  address: string
}

const breakWords = classnames('break-words')
const errorBlock = classnames('flex', 'flex-row', 'items-center', 'space-x-3')

const EthereumIdentityToVerify: FC<EthereumIdentityToVerifyProps> = ({
  address,
}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  return (
    <Card>
      <BodyText>Ethereum</BodyText>
      <div className={breakWords}>
        <LargerText>{address}</LargerText>
      </div>
      {error ? (
        <div className={errorBlock}>
          <Popup
            activator={
              <Button color="error" loading={loading}>
                Error
              </Button>
            }
            title="Address not found"
            body="Your ETH address is not valid. Please, make sure that it is correct"
            confirmTitle="Okay, thanks"
          />
          <Button color="accent" onClick={() => setError(false)}>
            Retry
          </Button>
        </div>
      ) : (
        <Button
          loading={loading}
          color="primary"
          onClick={async () => {
            setLoading(true)
            try {
              const from = address
              const msg = `0x${Buffer.from(address, 'utf8').toString('hex')}`
              const signature = await window.ethereum.request({
                method: 'personal_sign',
                params: [msg, from],
              })
              const verificationResult = await axios.post<{
                address: string
                token: string
              }>(`${import.meta.env.VITE_BACKEND}/eth/verify`, {
                address,
                signature,
              })
              if (
                !PublicAccountStore.connectedIdentities.find(
                  (identity) =>
                    identity.type === 'eth' && identity.identifier === address
                )
              ) {
                PublicAccountStore.connectedIdentities.unshift({
                  type: 'eth',
                  name: identities.eth.name,
                  identifier: address,
                  secret: verificationResult.data.token,
                })
              }
            } catch (error) {
              setError(true)
              console.error(error)
            } finally {
              setLoading(false)
            }
          }}
        >
          Verify
        </Button>
      )}
    </Card>
  )
}

export default EthereumIdentityToVerify
