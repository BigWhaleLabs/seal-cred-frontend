import { BodyText, ErrorText } from 'components/Text'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Card from 'components/Card'
import CryptoWallet from 'components/CryptoWallet'
import EthStore from 'stores/EthStore'
import configuredModal from 'helpers/configuredModal'

export default function AddIdentity() {
  const { ethLoading, ethError } = useSnapshot(EthStore)

  useEffect(() => {
    if (configuredModal.cachedProvider) {
      void EthStore.onConnect()
    }
  }, [])

  return (
    <Card>
      <BodyText>Link another identity</BodyText>
      <Button
        color="accent"
        loading={ethLoading}
        onClick={async () => {
          configuredModal.clearCachedProvider()
          await EthStore.onConnect()
        }}
      >
        <CryptoWallet />
        <span>Connect wallet</span>
      </Button>
      {ethError ? <ErrorText>{ethError}</ErrorText> : undefined}
    </Card>
  )
}
