import { useSnapshot } from 'valtio'
import CryptoWallet from 'components/CryptoWallet'
import Loading from 'components/Loading'
import PublicAccountStore from 'stores/PublicAccountStore'
import classnames, {
  backgroundColor,
  cursor,
  display,
  flexDirection,
  padding,
  whitespace,
} from 'classnames/tailwind'
import configuredModal from 'helpers/configuredModal'

const accountConnectContainer = classnames(
  padding('p-4'),
  backgroundColor('bg-gray-50'),
  display('flex'),
  flexDirection('flex-col'),
  cursor('cursor-pointer')
)

const accountText = classnames(padding('px-4'), whitespace('whitespace-nowrap'))

const connectText = classnames(display('flex'))

export default function ConnectPublicAccount() {
  const { ethLoading } = useSnapshot(PublicAccountStore)

  function onConnect() {
    if (ethLoading) return
    configuredModal.clearCachedProvider()
    void PublicAccountStore.onConnect()
  }

  return (
    <div className={accountConnectContainer} onClick={onConnect}>
      <span className={connectText}>
        {ethLoading ? <Loading /> : <CryptoWallet />}
        <span className={accountText}>Connect wallet</span>
      </span>
    </div>
  )
}
