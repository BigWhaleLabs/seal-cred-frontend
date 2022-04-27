import { AccentText } from 'components/Text'
import { Suspense, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'

function TokenList() {
  const { derivativeOwnedTokens } = useSnapshot(StreetCredStore)

  return (
    <>
      {derivativeOwnedTokens.map((token, index) => (
        <Card key={index}>{token}</Card>
      ))}
    </>
  )
}

function MintedDerivativeNft() {
  const { account } = useSnapshot(WalletStore)
  useEffect(() => {
    StreetCredStore.derivativeOwnedTokens =
      StreetCredStore.requestDerivativeContracts(account)
  }, [account])

  return (
    <Suspense fallback={<AccentText>Fetching minted tokens ...</AccentText>}>
      <TokenList />
    </Suspense>
  )
}

export default MintedDerivativeNft
