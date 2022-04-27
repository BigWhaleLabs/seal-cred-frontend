import { AccentText } from 'components/Text'
import { Suspense, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'

function SupportedNft() {
  const { originalContracts } = useSnapshot(StreetCredStore)

  return (
    <>
      {originalContracts.map((token, index) => (
        <Card key={index}>{token}</Card>
      ))}
    </>
  )
}

const SupportedNftWrapper = () => {
  const { account } = useSnapshot(WalletStore)
  useEffect(() => {
    if (!account) return
    StreetCredStore.requestOriginalContracts(account)
  }, [account])

  return (
    <Suspense fallback={<AccentText>Fetching avaliable tokens ...</AccentText>}>
      <SupportedNft />
    </Suspense>
  )
}

export default SupportedNftWrapper
