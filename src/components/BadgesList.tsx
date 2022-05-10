import { BodyText } from 'components/Text'
import { Suspense, useMemo } from 'react'
import { proxy, useSnapshot } from 'valtio'
import BadgeBlock from 'components/BadgeBlock'
import BadgesHintCard from 'components/BadgesHintCard'
import Fade from 'components/Fade'
import ProofStore from 'stores/ProofStore'
import ScrollableBlock from 'components/ScrollableBlock'
import SealCredStore from 'stores/SealCredStore'
import classnames, {
  display,
  gap,
  gridAutoRows,
  gridTemplateColumns,
  height,
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

function BadgeListSuspender() {
  const { derivativeContracts, ledger, derivativeTokenIds } =
    useSnapshot(SealCredStore)
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
      {!isOneBadge && <Fade bottom />}
    </>
  )
}

function BadgesList() {
  return (
    <ScrollableBlock fade="bottom" maxHeight="max-h-85">
      <Suspense
        fallback={<BodyText size="base">Fetching derivative NFTs...</BodyText>}
      >
        <BadgeListSuspender />
      </Suspense>
    </ScrollableBlock>
  )
}

export default BadgesList
