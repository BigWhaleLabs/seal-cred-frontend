import { GoerliContractsStore } from 'stores/ContractsStore'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import BadgesOwnedForContractLoading from 'components/badges/BadgesOwnedForContractLoading'
import MintedBadgeBlock from 'components/badges/MintedBadgeBlock'
import Network from 'models/Network'
import WalletStore from 'stores/WalletStore'

function BadgesOwnedForContractSuspended({
  contractAddress,
  network,
}: {
  contractAddress: string
  network: Network
}) {
  const { connectedAccounts } = useSnapshot(GoerliContractsStore)
  const { account } = useSnapshot(WalletStore)
  if (!account) {
    return (
      <BadgesOwnedForContractLoading
        contractAddress={contractAddress}
        network={network}
      />
    )
  }
  const contractSynchronizer = connectedAccounts[account]
  if (!contractSynchronizer) {
    return (
      <BadgesOwnedForContractLoading
        contractAddress={contractAddress}
        network={network}
      />
    )
  }
  const ownedIds = contractSynchronizer.tokenIds(contractAddress)
  return (
    <>
      {ownedIds.map((tokenId) => (
        <MintedBadgeBlock
          key={`${contractAddress}-${tokenId}`}
          derivativeAddress={contractAddress}
          tokenId={+tokenId}
          network={network}
        />
      ))}
    </>
  )
}

export default function ({
  contractAddress,
  network,
}: {
  contractAddress: string
  network: Network
}) {
  return (
    <Suspense
      fallback={
        <BadgesOwnedForContractLoading
          contractAddress={contractAddress}
          network={network}
        />
      }
    >
      <BadgesOwnedForContractSuspended
        contractAddress={contractAddress}
        network={network}
      />
    </Suspense>
  )
}
