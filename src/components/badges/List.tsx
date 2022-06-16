import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import BadgeBlock from 'components/badges/BadgeBlock'
import BadgesOwnedForContract from 'components/badges/BadgesOwnedForContract'
import HintCard from 'components/badges/HintCard'
import SealCredStore from 'stores/SealCredStore'
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
  const { derivativeContractsToIsOwnedMap } = useSnapshot(SealCredStore)
  const derivativeTokensOwned = Object.keys(
    derivativeContractsToIsOwnedMap
  ).filter(
    (contractAddress) => !!derivativeContractsToIsOwnedMap[contractAddress]
  )
  const proofsAvailableToMint = useProofsAvailableToMint()
  const isEmpty =
    !Object.keys(derivativeTokensOwned).length && !proofsAvailableToMint.length

  return !Object.keys(derivativeContractsToIsOwnedMap).length ? (
    <BodyText>Fetching derivative NFTs...</BodyText>
  ) : isEmpty ? (
    <HintCard text="You don't own any derivatives and you don't have any ZK proofs ready to use. Generate a ZK proof first!" />
  ) : (
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
