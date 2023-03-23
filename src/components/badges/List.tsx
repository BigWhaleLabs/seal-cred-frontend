import { Suspense } from 'preact/compat'
import { dataKeys } from 'helpers/contracts/dataShapeObject'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import BadgeSection from 'components/badges/BadgeSection'
import ConfettiIfNeeded from 'components/badges/ConfettiIfNeeded'
import DoxNotification from 'components/badges/DoxNotification'
import HintCard from 'components/badges/HintCard'
import NotificationsStore from 'stores/NotificationsStore'
import Scrollbar from 'components/ui/Scrollbar'
import ShareToTwitterIfNeeded from 'components/badges/ShareToTwitterIfNeeded'
import badgeConfig from 'badgeConfig'
import data from 'data'
import useMintedAddresses from 'hooks/useMintedAddresses'
import useProofsAvailableToMint from 'hooks/useProofsAvailableToMint'
import walletStore from 'stores/WalletStore'

function BadgeListSuspended() {
  const { account, isAccountNotifiedOfBeingDoxxed } = useSnapshot(walletStore)
  const { hasUnmintedProofs, ledgerToUnmintedProofs } =
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
          {dataKeys.map((ledgerName) => (
            <BadgeSection
              minted={ledgerToMintedAddresses[ledgerName]}
              proofs={ledgerToUnmintedProofs[ledgerName]}
              title={badgeConfig[data[ledgerName].badgeType].title(
                data[ledgerName]
              )}
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
