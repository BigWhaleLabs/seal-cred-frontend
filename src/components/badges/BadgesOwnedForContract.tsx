import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import BadgeBlock from 'components/badges/BadgeBlock'
import BadgesOwnedForContractLoading from 'components/badges/BadgesOwnedForContractLoading'
import ContractsStore from 'stores/ContractsStore'
import WalletStore from 'stores/WalletStore'

function BadgesOwnedForContractSuspended({
  contractAddress,
}: {
  contractAddress: string
}) {
  const { connectedAccounts } = useSnapshot(ContractsStore)
  const { account } = useSnapshot(WalletStore)
  if (!account) {
    return <BadgesOwnedForContractLoading contractAddress={contractAddress} />
  }
  const contractSynchronizer = connectedAccounts[account]
  if (!contractSynchronizer) {
    return <BadgesOwnedForContractLoading contractAddress={contractAddress} />
  }
  const ownedIds = [contractSynchronizer.tokenState[contractAddress]]
  return (
    <>
      {ownedIds.map((tokenId) => (
        <BadgeBlock
          key={`${contractAddress}-${tokenId}`}
          contractAddress={contractAddress}
          tokenId={tokenId}
        />
      ))}
    </>
  )
}

export default function ({ contractAddress }: { contractAddress: string }) {
  return (
    <Suspense
      fallback={
        <BadgesOwnedForContractLoading contractAddress={contractAddress} />
      }
    >
      <BadgesOwnedForContractSuspended contractAddress={contractAddress} />
    </Suspense>
  )
}
