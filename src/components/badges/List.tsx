import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import BadgeBlock from 'components/badges/BadgeBlock'
import BadgeSection from 'components/badges/BadgeSection'
import BadgesOwnedForContract from 'components/badges/BadgesOwnedForContract'
import ContractsStore from 'stores/ContractsStore'
import ERC721Proof from 'helpers/ERC721Proof'
import EmailProof from 'components/proofs/EmailProof'
import HintCard from 'components/badges/HintCard'
import SealCredStore from 'stores/SealCredStore'
import classnames, {
  height,
  overflow,
  position,
  space,
} from 'classnames/tailwind'
import useProofsAvailableToMint from 'hooks/useProofsAvailableToMint'

const badges = classnames(
  position('relative'),
  height('h-fit'),
  overflow('overflow-y-visible')
)

function BadgeListSuspended() {
  const { emailDerivativeContracts = [], ERC721derivativeContracts = [] } =
    useSnapshot(SealCredStore)
  const { contractsOwned } = useSnapshot(ContractsStore)

  const ownedEmailDerivativeContracts = emailDerivativeContracts.filter(
    (contractAddress) => contractsOwned.includes(contractAddress)
  )

  const ownedERC721DerivativeContracts = ERC721derivativeContracts.filter(
    (contractAddress) => contractsOwned.includes(contractAddress)
  )

  const proofsAvailableToMint = useProofsAvailableToMint()
  const isEmpty =
    !ownedEmailDerivativeContracts.length &&
    !ownedERC721DerivativeContracts.length &&
    !proofsAvailableToMint.length

  return isEmpty ? (
    <HintCard text="You don't own any derivatives and you don't have any ZK proofs ready to use. Generate a ZK proof first!" />
  ) : (
    <div className={space('space-y-2')}>
      {!!ownedEmailDerivativeContracts.length && (
        <BadgeSection title="Derivatives">
          {ownedERC721DerivativeContracts.map((contractAddress) => (
            <BadgesOwnedForContract
              key={contractAddress}
              contractAddress={contractAddress}
            />
          ))}
          {proofsAvailableToMint
            .filter((proof) => proof instanceof ERC721Proof)
            .map((proof) => (
              <BadgeBlock key={proof.key} proof={proof} />
            ))}
        </BadgeSection>
      )}
      {!!ownedERC721DerivativeContracts.length && (
        <BadgeSection title="Email">
          {ownedEmailDerivativeContracts.map((contractAddress) => (
            <BadgesOwnedForContract
              key={contractAddress}
              contractAddress={contractAddress}
            />
          ))}
          {proofsAvailableToMint
            .filter((proof) => proof instanceof EmailProof)
            .map((proof) => (
              <BadgeBlock key={proof.key} proof={proof} />
            ))}
        </BadgeSection>
      )}
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
