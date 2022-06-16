import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import LoadingTitle from 'components/badges/LoadingTitle'
import SealCredStore from 'stores/SealCredStore'
import Title from 'components/Title'
import proofStore from 'stores/ProofStore'
import useProofsAvailableToMint from 'hooks/useProofsAvailableToMint'

function ListTitleSuspended() {
  const { derivativeContractsToIsOwnedMap } = useSnapshot(SealCredStore)
  const proofsAvailableToMint = useProofsAvailableToMint()
  const { proofsCompleted } = useSnapshot(proofStore)

  const hasUnminted = proofsAvailableToMint.length > 0

  return !Object.keys(derivativeContractsToIsOwnedMap).length ? (
    <LoadingTitle />
  ) : (
    <Title
      title="Create ZK badges"
      subtitle={
        hasUnminted
          ? 'Looks like you can create ZK badges for this wallet'
          : proofsCompleted.length
          ? 'You generated all available ZK badges for this wallet'
          : 'Once you’ve created a ZK proof, you will be able to mint ZK badges for your anonymous wallets'
      }
    />
  )
}

export default function () {
  return (
    <Suspense fallback={<LoadingTitle />}>
      <ListTitleSuspended />
    </Suspense>
  )
}
