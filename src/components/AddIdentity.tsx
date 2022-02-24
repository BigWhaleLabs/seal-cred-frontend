import { BodyText } from 'components/Text'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Card from 'components/Card'
import CryptoWallet from 'components/CryptoWallet'
import EthStore from 'stores/EthStore'
import configuredModal from 'helpers/configuredModal'

export default function AddIdentity() {
  const { ethLoading } = useSnapshot(EthStore)

  useEffect(() => {
    if (configuredModal.cachedProvider) {
      void EthStore.onConnect()
    }
  }, [])

  return (
    <Card>
      <BodyText>Link another identity</BodyText>
      <Button
        color="primary"
        loading={ethLoading}
        onClick={async () => {
          configuredModal.clearCachedProvider()
          await EthStore.onConnect()
        }}
      >
        <CryptoWallet />
        <span>Crypto Wallet</span>
      </Button>
    </Card>
  )
}
