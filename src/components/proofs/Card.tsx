import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import CardContainer from 'components/proofs/CardContainer'
import ConnectAccount from 'components/proofs/ConnectAccount'
import LoadingCard from 'components/proofs/LoadingCard'
import ProofList from 'components/proofs/ProofList'
import WalletStore from 'stores/WalletStore'
import ZkProofHintWhenLg from 'components/proofs/ZkProofHintWhenLg'

export default function () {
  const { account, walletLoading } = useSnapshot(WalletStore)

  return (
    <CardContainer>
      <Card color="accent" shadow useAppStyles nospace>
        {walletLoading ? (
          <LoadingCard />
        ) : account ? (
          <ProofList />
        ) : (
          <ConnectAccount />
        )}
      </Card>
      <ZkProofHintWhenLg />
    </CardContainer>
  )
}
