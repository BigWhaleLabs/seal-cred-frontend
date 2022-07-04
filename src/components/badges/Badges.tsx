import { Suspense } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ConnectAccount from 'components/badges/ConnectAccount'
import List from 'components/badges/List'
import ListContainer from 'components/badges/ListContainer'
import ListTitle from 'components/badges/ListTitle'
import LoadingCard from 'components/badges/LoadingCard'
import Scrollbar from 'components/Scrollbar'
import WalletStore from 'stores/WalletStore'
import classnames, { display, flexGrow } from 'classnames/tailwind'

const proofContentBlock = classnames(display('flex'), flexGrow('grow'))

function BadgesSuspended() {
  const { height = 0, ref } = useResizeDetector({ handleWidth: false })

  return (
    <ListContainer>
      <ListTitle />
      <div className={proofContentBlock} ref={ref}>
        <Scrollbar parentHeight={height}>
          <List />
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
        <Suspense fallback={<LoadingCard />}>
          <BadgesSuspended />
        </Suspense>
      ) : (
        <ConnectAccount />
      )}
    </Card>
  )
}
