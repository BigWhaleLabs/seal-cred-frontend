import { BadgesContractsStore } from 'stores/ContractsStore'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import CardTitle from 'components/CardTitle'
import LoadingCard from 'components/badges/LoadingCard'
import SealCredStore from 'stores/SealCredStore'
import useContractsOwned from 'hooks/useContractsOwned'
import useProofsAvailableToMint from 'hooks/useProofsAvailableToMint'

function ListTitleSuspended() {
  const { allDerivativeContracts } = useSnapshot(SealCredStore)
  const { hasUnmintedProofs } = useProofsAvailableToMint()
  const contractsOwned = useContractsOwned(BadgesContractsStore)

  const ownedDerivativeContracts = allDerivativeContracts.filter(
    (contractAddress) => contractsOwned.includes(contractAddress)
  )

  return (
    <CardTitle
      title="Create ZK badges"
      subtitle={
        hasUnmintedProofs
          ? 'Looks like you can create ZK badges for this wallet'
          : ownedDerivativeContracts.length
          ? 'You’ve minted all of your available badges'
          : 'Once you’ve created a ZK proof, you will be able to mint ZK badges for your anonymous wallets'
      }
    />
  )
}

export default function () {
  return (
    <Suspense fallback={<LoadingCard />}>
      <ListTitleSuspended />
    </Suspense>
  )
}
