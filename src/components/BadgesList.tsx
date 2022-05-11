import { BodyText } from 'components/Text'
import { Suspense, useMemo } from 'react'
import { proxy, useSnapshot } from 'valtio'
import BadgeBlock from 'components/BadgeBlock'
import BadgesHintCard from 'components/BadgesHintCard'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'
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
import useDerivativeTokensOwned from 'helpers/useDerivativeTokensOwned'
import useProofsAvailableToMint from 'helpers/useProofsAvailableToMint'

const badges = classnames(
  position('relative'),
  height('h-fit'),
  maxHeight('max-h-85'),
  overflow('overflow-y-visible')
)
const badgesList = classnames(
  display('grid'),
  gap('gap-2'),
  gridAutoRows('auto-rows-auto'),
  gridTemplateColumns('grid-cols-1', 'lg:grid-cols-2')
)

function BadgeListSuspender() {
  const derivativeTokensOwned = useDerivativeTokensOwned()
  const proofsAvailableToMint = useProofsAvailableToMint()
  const isEmpty =
    !Object.keys(derivativeTokensOwned).length && !proofsAvailableToMint.length
  // const { derivativeContracts, ledger, derivativeTokenIds } =
  //   useSnapshot(SealCredStore)
  // const { proofsCompleted } = useSnapshot(ProofStore)
  // const completedProofs = proxy(proofsCompleted)
  // const scLedger = proxy(ledger)
  // const derivatives = proxy(derivativeContracts)

  // const proofContracts = useMemo(
  //   () => new Set(completedProofs.map((p) => p.contract)),
  //   [completedProofs]
  // )

  // const unownedDerivativeToOriginalAddressesMap = {} as {
  //   [derivativeAddress: string]: string
  // }

  // for (const proofContract of proofContracts) {
  //   const derivativeContract = scLedger[proofContract].derivativeContract
  //   if (!derivativeContract) continue
  //   if (derivativeTokenIds[derivativeContract.address]) continue
  //   unownedDerivativeToOriginalAddressesMap[derivativeContract.address] =
  //     proofContract
  // }

  // const unownedDerivativeRecords = Object.keys(
  //   unownedDerivativeToOriginalAddressesMap
  // ).map((address) => scLedger[unownedDerivativeToOriginalAddressesMap[address]])

  // const ownedDerivatives = derivatives
  //   ? Object.keys(derivativeTokenIds).map((address) =>
  //       derivatives.find((contract) => contract.address === address)
  //     )
  //   : []

  // const ownedDerivativesLength = ownedDerivatives.length
  // const unownedLedgerRecordsWithProofs = unownedDerivativeRecords.length
  // const badgesAmount = ownedDerivativesLength + unownedLedgerRecordsWithProofs

  return (
    <>
      {isEmpty && (
        <BadgesHintCard text="You don't own any derivatives and you don't have any ZK proofs ready to use. Generate a ZK proof first!" />
      )}
      <div className={badgesList}>
        {/* {Object.entries(derivativeTokensOwned)
          .map(([contractAddress, tokenIds]) =>
            tokenIds.map((tokenId) => (
              <BadgeBlock
                key={`${contractAddress}-${tokenId}`}
                contractAddress={contractAddress}
                tokenId={tokenId}
              />
            ))
          )
          .reduce((acc, curr) => acc.concat(curr), [])} */}
        {proofsAvailableToMint.map((proof) => (
          <BadgeBlock key={proof.contract} contractAddress={proof.contract} />
        ))}
      </div>
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
