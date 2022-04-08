import { ErrorText } from 'components/Text'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import CryptoWallet from 'components/CryptoWallet'
import Loading from 'components/Loading'
import PublicAccountStore from 'stores/PublicAccountStore'
import classnames, {
  backgroundColor,
  cursor,
  display,
  padding,
  whitespace,
} from 'classnames/tailwind'
import configuredModal from 'helpers/configuredModal'

const accountConnectContainer = classnames(
  padding('p-4'),
  backgroundColor('bg-gray-50'),
  display('flex'),
  cursor('cursor-pointer')
)

const accountText = classnames(padding('px-4'), whitespace('whitespace-nowrap'))

export default function ConnectPublicAccount() {
  const { ethLoading, ethError } = useSnapshot(PublicAccountStore)

  useEffect(() => {
    if (configuredModal.cachedProvider) {
      void PublicAccountStore.onConnect()
    }
  }, [])

  function onConnect() {
    configuredModal.clearCachedProvider()
    void PublicAccountStore.onConnect()
  }

  return (
    <div className={accountConnectContainer} onClick={onConnect}>
      {ethLoading && <Loading />}
      <CryptoWallet />
      <span className={accountText}>Connect wallet</span>
      {ethError && <ErrorText>{ethError}</ErrorText>}
    </div>
  )
}
