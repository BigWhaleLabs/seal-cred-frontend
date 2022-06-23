import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import BadgeBlock from 'components/badges/BadgeBlock'
import BadgesOwnedForContract from 'components/badges/BadgesOwnedForContract'
import ContractsStore from 'stores/ContractsStore'
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
  const { derivativeContracts = [] } = useSnapshot(SealCredStore)
  const { contractsOwned } = useSnapshot(ContractsStore)

  const ownederc721DerivativeContracts = derivativeContracts.filter(
    (contractAddress) => contractsOwned.includes(contractAddress)
  )

  const proofsAvailableToMint = useProofsAvailableToMint()
  const isEmpty =
    !Object.keys(ownederc721DerivativeContracts).length &&
    !proofsAvailableToMint.length

  return isEmpty ? (
    <HintCard text="You don't own any derivatives and you don't have any ZK proofs ready to use. Generate a ZK proof first!" />
  ) : (
    <div className={badgesList}>
      {ownederc721DerivativeContracts.map((contractAddress) => (
        <BadgesOwnedForContract
          key={contractAddress}
          contractAddress={contractAddress}
        />
      ))}
      {proofsAvailableToMint.map((proof) => (
        <BadgeBlock key={proof.key} proof={proof} />
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
