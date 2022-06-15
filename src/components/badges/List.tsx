import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import BadgeBlock from 'components/BadgeBlock'
import BadgeCard from 'components/BadgeCard'
import BadgeIcon from 'icons/BadgeIcon'
import BadgeWrapper from 'components/BadgeWrapper'
import Button from 'components/Button'
import ContractName from 'components/ContractName'
import DerivativeContractsStore from 'stores/DerivativeContractsStore'
import ExternalLink from 'components/ExternalLink'
import HintCard from 'components/badges/HintCard'
import WalletStore from 'stores/WalletStore'
import classnames, {
  display,
  gap,
  gridAutoRows,
  gridTemplateColumns,
  height,
  overflow,
  position,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
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

function BadgesOwnedForContractSuspended({
  contractAddress,
}: {
  contractAddress: string
}) {
  const { contractsToOwnersMaps } = useSnapshot(DerivativeContractsStore)
  const contractToOwnersMap = contractsToOwnersMaps[contractAddress]
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

function BadgesOwnedForContractLoading({
  contractAddress,
}: {
  contractAddress: string
}) {
  return (
    <BadgeWrapper minted={false}>
      <BadgeCard
        top={<BadgeIcon />}
        leanLeft
        text={
          <ExternalLink url={getEtherscanAddressUrl(contractAddress)}>
            <ContractName address={contractAddress} />
          </ExternalLink>
        }
        bottom={
          <Button small primary loading>
            Fetching...
          </Button>
        }
      />
    </BadgeWrapper>
  )
}

function BadgesOwnedForContract({
  contractAddress,
}: {
  contractAddress: string
}) {
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
