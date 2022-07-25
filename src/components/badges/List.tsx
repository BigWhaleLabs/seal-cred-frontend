import { GoerliContractsStore } from 'stores/ContractsStore'
import { Suspense } from 'preact/compat'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import BadgeSection from 'components/badges/BadgeSection'
import ConfettiIfNeeded from 'components/badges/ConfettiIfNeeded'
import DoxNotification from 'components/badges/DoxNotification'
import ERC721Proof from 'helpers/ERC721Proof'
import EmailProof from 'helpers/EmailProof'
import HintCard from 'components/badges/HintCard'
import Network from 'models/Network'
import Scrollbar from 'components/Scrollbar'
import SealCredStore from 'stores/SealCredStore'
import proofStore from 'stores/ProofStore'
import useContractsOwned from 'hooks/useContractsOwned'
import useProofsAvailableToMint from 'hooks/useProofsAvailableToMint'
import walletStore from 'stores/WalletStore'

function BadgeListSuspended() {
  const { account, walletsToNotifiedOfBeingDoxxed } = useSnapshot(walletStore)
  const { proofsCompleted } = useSnapshot(proofStore)
  const {
    emailDerivativeContracts = [],
    ERC721derivativeContracts = [],
    externalERC721derivativeContracts = [],
  } = useSnapshot(SealCredStore)
  const contractsOwned = useContractsOwned(GoerliContractsStore)

  const ownedEmailDerivativeContracts = emailDerivativeContracts.filter(
    (contractAddress) => contractsOwned.includes(contractAddress)
  )

  const ownedExternalERC721DerivativeContracts =
    externalERC721derivativeContracts.filter((contractAddress) =>
      contractsOwned.includes(contractAddress)
    )
  const ownedERC721DerivativeContracts = ERC721derivativeContracts.filter(
    (contractAddress) => contractsOwned.includes(contractAddress)
  )

  const proofsAvailableToMint = useProofsAvailableToMint()
  const isEmpty =
    !ownedExternalERC721DerivativeContracts.length &&
    !ownedEmailDerivativeContracts.length &&
    !ownedERC721DerivativeContracts.length &&
    !proofsAvailableToMint.length

  const shouldNotify =
    !!account &&
    !walletsToNotifiedOfBeingDoxxed[account] &&
    proofsCompleted.length > 0

  return shouldNotify ? (
    <DoxNotification account={account} />
  ) : isEmpty ? (
    <HintCard text="You don't own any derivatives and you don't have any ZK proofs ready to use. Generate a ZK proof first!" />
  ) : (
    <>
      <ConfettiIfNeeded />
      <Scrollbar>
        <div className={space('space-y-2')}>
          <BadgeSection
            title="Mainnet NFT derivatives"
            minted={ownedExternalERC721DerivativeContracts}
            proofs={proofsAvailableToMint.filter(
              (proof) =>
                proof instanceof ERC721Proof &&
                proof.network === Network.Mainnet
            )}
          />
          <BadgeSection
            title="Goerli NFT derivatives"
            minted={ownedERC721DerivativeContracts}
            proofs={proofsAvailableToMint.filter(
              (proof) =>
                proof instanceof ERC721Proof && proof.network === Network.Goerli
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
      </Scrollbar>
    </>
  )
}

export default function () {
  return (
    <Suspense fallback={<div>Fetching derivatives...</div>}>
      <BadgeListSuspended />
    </Suspense>
  )
}
