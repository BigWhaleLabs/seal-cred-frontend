import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import BadgeBlock from 'components/badges/BadgeBlock'
import BadgesOwnedForContract from 'components/badges/BadgesOwnedForContract'
import DerivativeContractsStore from 'stores/DerivativeContractsStore'
import HintCard from 'components/badges/HintCard'
import classnames, {
  display,
  gap,
  gridAutoRows,
  gridTemplateColumns,
  height,
  overflow,
  position,
} from 'classnames/tailwind'
import useProofsAvailableToMint from 'hooks/useProofsAvailableToMint'

const badges = classnames(
  position('relative'),
  height('h-fit'),
  overflow('overflow-y-visible')
)
const badgesList = classnames(
  display('grid'),
  gap('gap-2'),
  gridAutoRows('auto-rows-auto'),
  gridTemplateColumns('grid-cols-1', 'lg:grid-cols-2')
)
function BadgeListSuspended() {
  const { contractsToIsOwnedMap } = useSnapshot(DerivativeContractsStore)
  const derivativeTokensOwned = Object.keys(contractsToIsOwnedMap).filter(
    (contractAddress) => contractsToIsOwnedMap[contractAddress]
  )
  const proofsAvailableToMint = useProofsAvailableToMint()
  const isEmpty =
    !Object.keys(derivativeTokensOwned).length && !proofsAvailableToMint.length

  if (isEmpty)
    return (
      <HintCard text="You don't own any derivatives and you don't have any ZK proofs ready to use. Generate a ZK proof first!" />
    )

  return (
    <div className={badgesList}>
      {derivativeTokensOwned.map((contractAddress) => (
        <BadgesOwnedForContract
          key={contractAddress}
          contractAddress={contractAddress}
        />
      ))}
      {proofsAvailableToMint.map((proof) => (
        <BadgeBlock key={proof.contract} contractAddress={proof.contract} />
      ))}
    </div>
  )
}

export default function () {
  return (
    <div className={badges}>
      <Suspense fallback={<BodyText>Fetching derivative NFTs...</BodyText>}>
        <BadgeListSuspended />
      </Suspense>
    </div>
  )
}
