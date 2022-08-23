import { BadgesNetwork } from 'stores/ContractsStore'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import BadgesOwnedForContractLoading from 'components/badges/BadgesOwnedForContractLoading'
import MintedBadgeBlock from 'components/badges/MintedBadgeBlock'
import WalletStore from 'stores/WalletStore'
import useContractTokens from 'hooks/useContractTokens'

function BadgesOwnedForContractSuspended({
  contractAddress,
}: {
  contractAddress: string
}) {
  const ownedIds = useContractTokens(contractAddress, BadgesNetwork)
  const { account } = useSnapshot(WalletStore)

  if (!account || ownedIds.length === 0) {
    return <BadgesOwnedForContractLoading contractAddress={contractAddress} />
  }

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
