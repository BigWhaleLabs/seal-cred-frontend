import { BodyText, LargerText } from 'components/Text'
import { Buffer } from 'buffer'
import { FC, useState } from 'react'
import { classnames, wordBreak } from 'classnames/tailwind'
import Button from 'components/Button'
import Card from 'components/Card'
import EthStore from 'stores/EthStore'
import PublicAccountStore from 'stores/PublicAccountStore'
import axios from 'axios'
import identities from 'models/identities'

interface EthereumIdentityToVerifyProps {
  address: string
}

const breakWords = classnames(wordBreak('break-words'))

const EthereumIdentityToVerify: FC<EthereumIdentityToVerifyProps> = ({
  address,
}) => {
  const [loading, setLoading] = useState(false)

  return (
    <Card>
      <BodyText>Ethereum</BodyText>
      <div className={breakWords}>
        <LargerText>{address}</LargerText>
      </div>
      <Button
        loading={loading}
        color="primary"
        onClick={async () => {
          setLoading(true)
          try {
            const msg = `0x${Buffer.from(address, 'utf8').toString('hex')}`
            const signature = await EthStore.signMessage(msg)
            if (!signature) return
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
            console.error(error)
          } finally {
            setLoading(false)
          }
        }}
      >
        Verify
      </Button>
    </Card>
  )
}

export default EthereumIdentityToVerify
