import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import CardContainer from 'components/proofs/CardContainer'
import ConnectAccount from 'components/proofs/ConnectAccount'
import List from 'components/proofs/List'
import LoadingTitle from 'components/proofs/LoadingTitle'
import WalletStore from 'stores/WalletStore'
import ZkProofHintWhenLg from 'components/proofs/ZkProofHintWhenLg'

export default function () {
  const { account } = useSnapshot(WalletStore)

  return (
    <CardContainer>
      <Card color="accent" shadow>
        {account ? (
          <Suspense fallback={<LoadingTitle />}>
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
