import { BadgesNetwork } from 'stores/ContractsStore'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import CardTitle from 'components/ui/CardTitle'
import LoadingCard from 'components/badges/LoadingCard'
import SealCredStore from 'stores/SealCredStore'
import useOwnedAddresses from 'hooks/useOwnedAddresses'
import useProofsAvailableToMint from 'hooks/useProofsAvailableToMint'

function ListTitleSuspended() {
  const { allDerivativeAddresses } = useSnapshot(SealCredStore)
  const { hasUnmintedProofs } = useProofsAvailableToMint()
  const addressesOwned = useOwnedAddresses(BadgesNetwork)

  const ownedDerivativeContracts = allDerivativeAddresses.filter((address) =>
    addressesOwned.includes(address)
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
