import { BodyText, SubheaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import CryptoWallet from 'icons/CryptoWallet'
import WalletStore from 'stores/WalletStore'
import configuredModal from 'helpers/web3Modal'

export default function Wallet() {
  const { walletLoading, account } = useSnapshot(WalletStore)
  return account ? (
    <SubheaderText>{account}</SubheaderText>
  ) : (
    <>
      <BodyText>Connect a wallet to see this section:</BodyText>
      <Button
        color="success"
        loading={walletLoading}
        onClick={async () => {
          configuredModal.clearCachedProvider()
          await WalletStore.connect()
        }}
      >
        <CryptoWallet />
        <span>Connect wallet</span>
      </Button>
    </>
  )
}
