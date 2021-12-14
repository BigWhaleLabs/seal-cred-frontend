import { BodyText } from 'components/Text'
import { useState } from 'react'
import Button from 'components/Button'
import Card from 'components/Card'
import EthStore from 'stores/EthStore'

export default function AddIdentity() {
  const [loading, setLoading] = useState(false)
  return (
    <Card>
      <BodyText>Link another identity</BodyText>
      <Button
        type="primary"
        disabled={loading}
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
    </Card>
  )
}
