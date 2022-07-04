import { RefObject, Suspense } from 'react'
import { useScrollShadow } from 'use-scroll-shadow'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ConnectAccount from 'components/badges/ConnectAccount'
import List from 'components/badges/List'
import ListTitle from 'components/badges/ListTitle'
import LoadingCard from 'components/badges/LoadingCard'
import WalletStore from 'stores/WalletStore'
import classnames, { display, flexGrow, overflow } from 'classnames/tailwind'

const proofContentBlock = classnames(
  display('flex'),
  flexGrow('grow'),
  overflow('overflow-y-auto')
)

function BadgesSuspended() {
  const { elementRef } = useScrollShadow()

  return (
    <>
      <ListTitle />
      <div
        className={proofContentBlock}
        ref={elementRef as RefObject<HTMLDivElement>}
      >
        <List />
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
