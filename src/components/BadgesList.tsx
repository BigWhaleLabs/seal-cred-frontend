import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { proxy, useSnapshot } from 'valtio'
import BadgeBlock from 'components/BadgeBlock'
import BadgesHintCard from 'components/BadgesHintCard'
import ProofStore from 'stores/ProofStore'
import StreetCredStore from 'stores/StreetCredStore'
import classnames, {
  backgroundImage,
  display,
  gap,
  gradientColorStops,
  gridAutoRows,
  gridTemplateColumns,
  height,
  inset,
  maxHeight,
  overflow,
  position,
} from 'classnames/tailwind'

const badges = classnames(
  position('relative'),
  height('h-fit'),
  maxHeight('max-h-85'),
  overflow('overflow-auto')
)
const badgesList = (oneElement?: boolean) =>
  classnames(
    display('grid'),
    gap('gap-2'),
    gridAutoRows('auto-rows-auto'),
    gridTemplateColumns(
      'grid-cols-1',
      oneElement ? 'lg:grid-cols-1' : 'lg:grid-cols-2'
    )
  )

const badgesListOverflow = classnames(
  position('sticky'),
  inset('bottom-0', 'right-0', 'left-0'),
  height('h-8'),
  backgroundImage('bg-gradient-to-b'),
  gradientColorStops('from-transparent', 'to-blue-900')
)

function BadgeListSuspender() {
  const { derivativeContracts, ledger } = useSnapshot(StreetCredStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const ownedDerivativeContracts = derivativeContracts?.owned || []
  const unownedDerivativeContracts = derivativeContracts?.unowned || []
  const completedProofs = proxy(proofsCompleted)
  const scLedger = proxy(ledger)

  const unownedDerivativeToOriginalAddressesMap = {} as {
    [derivativeAddress: string]: string
  }
  for (const originalAddress of Object.keys(ledger)) {
    const derivativeContract = ledger[originalAddress].derivativeContract
    if (derivativeContract) {
      unownedDerivativeToOriginalAddressesMap[derivativeContract.address] =
        originalAddress
    }
  }

  const unownedDerivativeContractsWithZKProofs =
    unownedDerivativeContracts.filter(
      (contract) =>
        !!completedProofs.find(
          (proof) =>
            proof.contract ===
            unownedDerivativeToOriginalAddressesMap[contract.address]
        )
    )
  const unownedLedgerRecordsWithZKProofs =
    unownedDerivativeContractsWithZKProofs.map(
      (contract) =>
        scLedger[unownedDerivativeToOriginalAddressesMap[contract.address]]
    )

  const ownedDerivativesLength = ownedDerivativeContracts.length
  const unownedLedgerRecordsWithProofs = unownedLedgerRecordsWithZKProofs.length
  const badgesAmount = ownedDerivativesLength + unownedLedgerRecordsWithProofs
  const isOneBadge = badgesAmount < 2
  const isEmpty = badgesAmount < 1

  return (
    <>
      {isEmpty && (
        <BadgesHintCard
          text="You don't have any unowned derivative contracts that you can mint 
          or any owned token to share. Generate ZK proof first and then mint token."
        />
      )}
      <div className={badgesList(isOneBadge)}>
        {!!ownedDerivativesLength &&
          ownedDerivativeContracts.map((ledgerRecord) => (
            <BadgeBlock
              key={ledgerRecord.address}
              address={ledgerRecord.address}
            />
          ))}
        {!!unownedLedgerRecordsWithProofs &&
          unownedLedgerRecordsWithZKProofs.map((ledgerRecord) => (
            <BadgeBlock
              key={ledgerRecord.originalContract.address}
              address={ledgerRecord.derivativeContract.address}
              originalAddress={ledgerRecord.originalContract.address}
            />
          ))}
      </div>
      {!isOneBadge && <div className={badgesListOverflow}></div>}
    </>
  )
}

function BadgesList() {
  return (
    <div className={badges}>
      <Suspense
        fallback={<BodyText size="base">Fetching derivative NFTs...</BodyText>}
      >
        <BadgeListSuspender />
      </Suspense>
    </div>
  )
}

export default BadgesList
