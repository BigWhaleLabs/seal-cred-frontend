import { ErrorText } from 'components/Text'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import CryptoWallet from 'components/CryptoWallet'
import Loading from 'components/Loading'
import PublicAccountStore from 'stores/PublicAccountStore'
import configuredModal from 'helpers/configuredModal'

export default function ConnectPublicAccount() {
  const { ethLoading, ethError } = useSnapshot(PublicAccountStore)

  useEffect(() => {
    if (configuredModal.cachedProvider) {
      void PublicAccountStore.onConnect()
    }
  }, [])

  return (
    <div className="p-2 bg-gray-50">
      <span className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
        <span
          onClick={async () => {
            configuredModal.clearCachedProvider()
            await PublicAccountStore.onConnect()
          }}
          className="flex items-center cursor-pointer width-auto"
        >
          {ethLoading && <Loading />}
          <CryptoWallet />
          <span className="px-4 whitespace-nowrap">Connect wallet</span>
          {ethError && <ErrorText>{ethError}</ErrorText>}
        </span>
      </span>
    </div>
  )
}
