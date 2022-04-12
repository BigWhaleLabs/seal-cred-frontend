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

const errorTextContainer = classnames(padding('pt-4'), display('flex'))

export default function ConnectPublicAccount() {
  const { ethLoading, ethError } = useSnapshot(PublicAccountStore)

  useEffect(() => {
    if (configuredModal.cachedProvider) {
      void PublicAccountStore.onConnect()
    }
  }, [])

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
      {ethError && (
        <span className={errorTextContainer}>
          <ErrorText>{ethError}</ErrorText>
        </span>
      )}
    </div>
  )
}
