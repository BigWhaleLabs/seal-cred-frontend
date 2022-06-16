import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import BadgeBlock from 'components/badges/BadgeBlock'
import BadgesOwnedForContractLoading from 'components/badges/BadgesOwnedForContractLoading'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'

function BadgesOwnedForContractSuspended({
  contractAddress,
}: {
  contractAddress: string
}) {
  const { derivativeContractsToOwnersMaps } = useSnapshot(SealCredStore)
  const contractToOwnersMap =
    derivativeContractsToOwnersMaps[contractAddress] || {}
  const { account } = useSnapshot(WalletStore)
  const ownedIds = Object.keys(contractToOwnersMap)
    .map((v) => +v)
    .filter((tokenId) => contractToOwnersMap[tokenId] === account)
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
