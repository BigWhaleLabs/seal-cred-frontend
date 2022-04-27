import { AccentText } from 'components/Text'
import { Suspense, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import StreetCredAccountStore from 'stores/StreetCredAccountStore'

function SupportedNft() {
  const { originalOwnedTokens } = useSnapshot(StreetCredAccountStore)

  return (
    <>
      {originalOwnedTokens.map((token, index) => (
        <Card key={index}>{token}</Card>
      ))}
    </>
  )
}

function SupportedNftWrapper() {
  return (
    <Suspense fallback={<AccentText>Fetching avaliable tokens ...</AccentText>}>
      <SupportedNft />
    </Suspense>
  )
}

export default SupportedNftWrapper
