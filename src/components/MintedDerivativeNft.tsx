import { AccentText, BodyText } from 'components/Text'
import { Suspense, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'

function TokenList() {
  const { derivativeOwnedTokens } = useSnapshot(StreetCredStore)

  return (
    <>
      {derivativeOwnedTokens.length > 0 ? (
        derivativeOwnedTokens.map((token, index) =>
          token ? <Card key={index}>{token}</Card> : null
        )
      ) : (
        <BodyText>You didn't mint anything yet.</BodyText>
      )}
    </>
  )
}

function MintedDerivativeNft() {
  const { account } = useSnapshot(WalletStore)
  useEffect(() => {
    StreetCredStore.refreshDerivativeContracts(account)
  }, [account])

  return (
    <Suspense fallback={<AccentText>Fetching minted tokens ...</AccentText>}>
      <TokenList />
    </Suspense>
  )
}

export default MintedDerivativeNft
