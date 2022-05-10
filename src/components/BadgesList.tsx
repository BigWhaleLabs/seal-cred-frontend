import { BodyText } from 'components/Text'
import { Suspense, useMemo } from 'react'
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
  const { derivativeContracts, ledger, derivativeTokenIds } =
    useSnapshot(StreetCredStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const completedProofs = proxy(proofsCompleted)
  const scLedger = proxy(ledger)
  const derivatives = proxy(derivativeContracts)

  const proofContracts = useMemo(
    () => new Set(completedProofs.map((p) => p.contract)),
    [completedProofs]
  )

  const unownedDerivativeToOriginalAddressesMap = {} as {
    [derivativeAddress: string]: string
  }

  for (const proofContract of proofContracts) {
    const derivativeContract = scLedger[proofContract].derivativeContract
    if (!derivativeContract) continue
    if (derivativeTokenIds[derivativeContract.address]) continue
    unownedDerivativeToOriginalAddressesMap[derivativeContract.address] =
      proofContract
  }

  const unownedDerivativeRecords = Object.keys(
    unownedDerivativeToOriginalAddressesMap
  ).map((address) => scLedger[unownedDerivativeToOriginalAddressesMap[address]])

  const ownedDerivatives = derivatives
    ? Object.keys(derivativeTokenIds).map((address) =>
        derivatives.find((contract) => contract.address === address)
      )
    : []

  const ownedDerivativesLength = ownedDerivatives.length
  const unownedLedgerRecordsWithProofs = unownedDerivativeRecords.length
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
          ownedDerivatives.map(
            (derivative) =>
              derivative && (
                <BadgeBlock
                  key={derivative.address}
                  address={derivative.address}
                />
              )
          )}
        {!!unownedDerivativeRecords &&
          unownedDerivativeRecords.map((ledgerRecord) => (
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
