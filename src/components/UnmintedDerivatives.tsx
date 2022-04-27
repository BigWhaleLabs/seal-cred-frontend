import { AccentText } from 'components/Text'
import { Suspense, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'

function TokenList() {
  const { unmintedDerivatives } = useSnapshot(StreetCredStore)

  return (
    <>
      {unmintedDerivatives.map((contract, index) => (
        <Card key={index}>
          {void contract.name()}
          <button
            onClick={() => {
              // const zkProof = getZkProof()
              // const tx = await contract.functions.mint()
              // await tx.wait()
            }}
          />
        </Card>
      ))}
    </>
  )
}

export default function UnmintedDerivatives() {
  const { account } = useSnapshot(WalletStore)
  useEffect(() => {
    void StreetCredStore.refreshUnmintedDerivatives(account)
  }, [account])

  return (
    <Suspense fallback={<AccentText>Fetching minted tokens ...</AccentText>}>
      <TokenList />
    </Suspense>
  )
}
