import { Suspense } from 'react'
import { useResizeDetector } from 'react-resize-detector'
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
import classnames, { display, flexGrow } from 'classnames/tailwind'

const proofContentBlock = classnames(display('flex'), flexGrow('grow'))

function BadgesSuspended() {
  const { account, walletsToNotifiedOfBeingDoxxed } = useSnapshot(WalletStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { height = 0, ref } = useResizeDetector({ handleWidth: false })

  const shouldNotify =
    !!account &&
    !walletsToNotifiedOfBeingDoxxed[account] &&
    proofsCompleted.length > 0

  return (
    <ListContainer>
      <ListTitle />
      <div className={proofContentBlock} ref={ref}>
        <Scrollbar parentHeight={shouldNotify ? 0 : height}>
          {shouldNotify ? <DoxNotification account={account} /> : <List />}
        </Scrollbar>
      </div>
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
