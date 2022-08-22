import { GoerliContractsStore } from 'stores/ContractsStore'
import { Suspense } from 'preact/compat'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import BadgeSection from 'components/badges/BadgeSection'
import ConfettiIfNeeded from 'components/badges/ConfettiIfNeeded'
import DoxNotification from 'components/badges/DoxNotification'
import HintCard from 'components/badges/HintCard'
import NotificationsStore from 'stores/NotificationsStore'
import Scrollbar from 'components/Scrollbar'
import SealCredStore from 'stores/SealCredStore'
import ShareToTwitterIfNeeded from 'components/badges/ShareToTwitterIfNeeded'
import data from 'data'
import dataShapeObject from 'helpers/contracts/dataShapeObject'
import proofStore from 'stores/ProofStore'
import useContractsOwned from 'hooks/useContractsOwned'
import useProofsAvailableToMint from 'hooks/useProofsAvailableToMint'
import walletStore from 'stores/WalletStore'

function BadgeListSuspended() {
  const { account, walletsToNotifiedOfBeingDoxxed } = useSnapshot(walletStore)
  const { proofsCompleted } = useSnapshot(proofStore)
  const { derivativeContracts } = useSnapshot(SealCredStore)

  const contractsOwned = useContractsOwned(GoerliContractsStore)

  const ownedContractsByKey = dataShapeObject((ledgerName: string) =>
    derivativeContracts[ledgerName].filter((contractAddress) =>
      contractsOwned.includes(contractAddress)
    )
  )

  const proofsAvailableToMint = useProofsAvailableToMint()

  const hasProofs = proofsAvailableToMint.length
  const hasDerivatives = Object.values(ownedContractsByKey).reduce(
    (sum, contracts) => sum + contracts.length,
    0
  )
  const isEmpty = !hasProofs && !hasDerivatives

  const shouldNotify =
    !!account &&
    !walletsToNotifiedOfBeingDoxxed[account] &&
    proofsCompleted.length > 0

  const onMinted = () => {
    if (hasProofs && !hasDerivatives) NotificationsStore.showTwitterShare = true
  }

  return shouldNotify ? (
    <DoxNotification account={account} />
  ) : isEmpty ? (
    <HintCard text="You don't own any derivatives and you don't have any ZK proofs ready to use. Generate a ZK proof first!" />
  ) : (
    <>
      <ConfettiIfNeeded />
      <Scrollbar>
        <div className={space('space-y-2')}>
          {Object.entries(ownedContractsByKey).map(([key, contracts]) => (
            <>
              <BadgeSection
                title={data[key as keyof typeof data].title}
                minted={contracts}
                proofs={proofsAvailableToMint[key]}
                onMinted={onMinted}
              />
              {contracts[0] && (
                <ShareToTwitterIfNeeded
                  derivativeAddress={contracts[0]}
                  network={data[key as keyof typeof data].source.network}
                />
              )}
            </>
          ))}
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
