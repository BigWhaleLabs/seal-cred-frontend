import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import BadgeSection from 'components/badges/BadgeSection'
import ContractsStore from 'stores/ContractsStore'
import ERC721Proof from 'helpers/ERC721Proof'
import EmailProof from 'helpers/EmailProof'
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
      <BadgeSection
        title="NFT derivatives"
        minted={ownedERC721DerivativeContracts}
        proofs={proofsAvailableToMint.filter(
          (proof) => proof instanceof ERC721Proof
        )}
      />
      <BadgeSection
        title="Email derivatives"
        minted={ownedEmailDerivativeContracts}
        proofs={proofsAvailableToMint.filter(
          (proof) => proof instanceof EmailProof
        )}
      />
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
