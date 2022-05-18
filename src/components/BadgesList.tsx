import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import BadgeBlock from 'components/BadgeBlock'
import BadgesHintCard from 'components/BadgesHintCard'
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
import useDerivativeTokensOwned from 'hooks/useDerivativeTokensOwned'
import useProofsAvailableToMint from 'hooks/useProofsAvailableToMint'

const badges = classnames(
  position('relative'),
  height('h-fit'),
  maxHeight('max-h-badges-list'),
  overflow('overflow-y-visible')
)
const badgesList = classnames(
  display('grid'),
  gap('gap-2'),
  gridAutoRows('auto-rows-auto'),
  gridTemplateColumns('grid-cols-1', 'lg:grid-cols-2')
)

function BadgeListSuspender() {
  const { derivativeLedger } = useSnapshot(SealCredStore)
  const derivativeTokensOwned = useDerivativeTokensOwned()
  const proofsAvailableToMint = useProofsAvailableToMint()
  const isEmpty =
    !Object.keys(derivativeTokensOwned).length && !proofsAvailableToMint.length

  return (
    <>
      {isEmpty && (
        <BadgesHintCard text="You don't own any derivatives and you don't have any ZK proofs ready to use. Generate a ZK proof first!" />
      )}
      <div className={badgesList}>
        {Object.entries(derivativeTokensOwned)
          .map(([derivativeAddress, tokenIds]) =>
            tokenIds.map((tokenId) => (
              <BadgeBlock
                key={`${derivativeAddress}-${tokenId}`}
                contractAddress={
                  derivativeLedger[derivativeAddress].originalContract.address
                }
                tokenId={tokenId}
              />
            ))
          )
          .reduce((acc, curr) => acc.concat(curr), [])}
        {proofsAvailableToMint.map((proof) => (
          <BadgeBlock key={proof.contract} contractAddress={proof.contract} />
        ))}
      </div>
    </>
  )
}

export default function () {
  return (
    <div className={badges}>
      <Suspense fallback={<BodyText>Fetching derivative NFTs...</BodyText>}>
        <BadgeListSuspender />
      </Suspense>
    </div>
  )
}
