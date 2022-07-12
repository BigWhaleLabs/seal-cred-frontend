import { GoerliContractsStore } from 'stores/ContractsStore'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import BadgesOwnedForContractLoading from 'components/badges/BadgesOwnedForContractLoading'
import MintedBadgeBlock from 'components/badges/MintedBadgeBlock'
import WalletStore from 'stores/WalletStore'

function BadgesOwnedForContractSuspended({
  contractAddress,
}: {
  contractAddress: string
}) {
  const { addressToTokenIds } = useSnapshot(GoerliContractsStore)
  const { account } = useSnapshot(WalletStore)
  if (!account) {
    return <BadgesOwnedForContractLoading contractAddress={contractAddress} />
  }
  if (!addressToTokenIds) {
    return <BadgesOwnedForContractLoading contractAddress={contractAddress} />
  }
  const ownedIds = addressToTokenIds[contractAddress]
  return (
    <>
      {ownedIds.map((tokenId) => (
        <MintedBadgeBlock
          key={`${contractAddress}-${tokenId}`}
          derivativeAddress={contractAddress}
          tokenId={+tokenId}
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
