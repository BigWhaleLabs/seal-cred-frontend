import { DataKeys } from 'models/DataKeys'
import { Suspense } from 'preact/compat'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import BadgeSection from 'components/badges/BadgeSection'
import ConfettiIfNeeded from 'components/badges/ConfettiIfNeeded'
import DoxNotification from 'components/badges/DoxNotification'
import HintCard from 'components/badges/HintCard'
import NotificationsStore from 'stores/NotificationsStore'
import Scrollbar from 'components/Scrollbar'
import ShareToTwitterIfNeeded from 'components/badges/ShareToTwitterIfNeeded'
import data from 'data'
import useMintedAddresses from 'hooks/useMintedAddresses'
import useProofsAvailableToMint from 'hooks/useProofsAvailableToMint'
import walletStore from 'stores/WalletStore'

function BadgeListSuspended() {
  const { account, isAccountNotifiedOfBeingDoxxed } = useSnapshot(walletStore)
  const { ledgerToUnmintedProofs, hasUnmintedProofs } =
    useProofsAvailableToMint()
  const { hasMinted, ledgerToMintedAddresses } = useMintedAddresses()

  const isEmpty = !hasUnmintedProofs && !hasMinted
  const shouldNotify =
    account && !isAccountNotifiedOfBeingDoxxed && hasUnmintedProofs

  const onMinted = () => {
    if (hasUnmintedProofs && !hasMinted)
      NotificationsStore.showTwitterShare = true
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
          {(Object.keys(data) as DataKeys[]).map((ledgerName) => (
            <BadgeSection
              title={data[ledgerName].title}
              minted={ledgerToMintedAddresses[ledgerName]}
              proofs={ledgerToUnmintedProofs[ledgerName]}
              onMinted={onMinted}
            />
          ))}
          <ShareToTwitterIfNeeded />
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
