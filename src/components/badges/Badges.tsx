import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ConnectAccount from 'components/badges/ConnectAccount'
import DoxNotification from 'components/badges/DoxNotification'
import List from 'components/badges/List'
import ListContainer from 'components/badges/ListContainer'
import ListTitle from 'components/badges/ListTitle'
import LoadingCard from 'components/badges/LoadingCard'
import ProofStore from 'stores/ProofStore'
import ScrollShadow from 'components/ScrollShadow'
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

  const shouldNotify =
    !!account &&
    !walletsToNotifiedOfBeingDoxxed[account] &&
    proofsCompleted.length > 0

  return (
    <ListContainer>
      <ListTitle />
      <div className={proofContentBlock}>
        <ScrollShadow>
          {shouldNotify ? <DoxNotification account={account} /> : <List />}
        </ScrollShadow>
      </div>
    </ListContainer>
  )
}

export default function () {
  const { account } = useSnapshot(WalletStore)
  return (
    <Card shadow color="secondary">
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
