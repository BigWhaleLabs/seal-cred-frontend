import { AccentText } from 'components/Text'
import { Suspense, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'

function SupportedNft() {
  const { originalOwnedTokens } = useSnapshot(StreetCredStore)

  return (
    <>
      {originalOwnedTokens.map((token, index) => (
        <Card key={index}>{token}</Card>
      ))}
    </>
  )
}

function SupportedNftWrapper() {
  const { account } = useSnapshot(WalletStore)
  useEffect(() => {
    StreetCredStore.requestOriginalContracts(account)
  }, [account])

  return (
    <Suspense fallback={<AccentText>Fetching avaliable tokens ...</AccentText>}>
      <SupportedNft />
    </Suspense>
  )
}

export default SupportedNftWrapper
