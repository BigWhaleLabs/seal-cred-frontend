import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import CardContainer from 'components/proofs/CardContainer'
import CardLoader from 'components/CardLoader'
import ConnectAccount from 'components/proofs/ConnectAccount'
import List from 'components/proofs/List'
import WalletStore from 'stores/WalletStore'
import ZkProofHintWhenLg from 'components/proofs/ZkProofHintWhenLg'

export default function () {
  const { account } = useSnapshot(WalletStore)

  return (
    <CardContainer>
      <Card color="accent" shadow>
        {account ? (
          <Suspense
            fallback={
              <CardLoader
                color="accent"
                title="Loading..."
                subtitle="Please, wait until I load supported NFTs, it takes time"
              />
            }
          >
            <List />
          </Suspense>
        ) : (
          <ConnectAccount />
        )}
      </Card>
      <ZkProofHintWhenLg />
    </CardContainer>
  )
}
