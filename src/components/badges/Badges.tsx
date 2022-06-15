import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ConnectAccount from 'components/badges/ConnectAccount'
import DoxNotification from 'components/badges/DoxNotification'
import List from 'components/badges/List'
import ListContainer from 'components/badges/ListContainer'
import ListTitle from 'components/badges/ListTitle'
import LoadingTitle from 'components/badges/LoadingTitle'
import ProofStore from 'stores/ProofStore'
import Scrollbar from 'components/Scrollbar'
import WalletStore from 'stores/WalletStore'

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
      <Scrollbar>
        {shouldNotify ? <DoxNotification account={account} /> : <List />}
      </Scrollbar>
    </ListContainer>
  )
}

export default function () {
  const { account } = useSnapshot(WalletStore)
  return (
    <Card shadow color="secondary">
      {account ? (
        <Suspense fallback={<LoadingTitle />}>
          <BadgesSuspended />
        </Suspense>
      ) : (
        <ConnectAccount />
      )}
    </Card>
  )
}
