import { RefObject, Suspense } from 'react'
import { useScrollShadow } from 'use-scroll-shadow'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ConnectAccount from 'components/badges/ConnectAccount'
import DoxNotification from 'components/badges/DoxNotification'
import List from 'components/badges/List'
import ListTitle from 'components/badges/ListTitle'
import LoadingCard from 'components/badges/LoadingCard'
import ProofStore from 'stores/ProofStore'
import WalletStore from 'stores/WalletStore'
import classnames, { display, flexGrow, overflow } from 'classnames/tailwind'

const proofContentBlock = classnames(
  display('flex'),
  flexGrow('grow'),
  overflow('overflow-y-auto')
)

function BadgesSuspended() {
  const { account, walletsToNotifiedOfBeingDoxxed } = useSnapshot(WalletStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { elementRef } = useScrollShadow()

  const shouldNotify =
    !!account &&
    !walletsToNotifiedOfBeingDoxxed[account] &&
    proofsCompleted.length > 0

  return (
    <>
      <ListTitle />
      <div
        className={proofContentBlock}
        ref={elementRef as RefObject<HTMLDivElement>}
      >
        {shouldNotify ? <DoxNotification account={account} /> : <List />}
      </div>
    </>
  )
}

export default function () {
  const { account } = useSnapshot(WalletStore)
  return (
    <Card shadow color="secondary" forApp>
      {account ? (
        <Suspense fallback={<LoadingCard />}>
          <BadgesSuspended />
        </Suspense>
      ) : (
        <ConnectAccount />
      )}
    </Card>
  )
}
