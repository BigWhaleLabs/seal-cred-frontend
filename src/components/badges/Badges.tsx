import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ConnectAccount from 'components/badges/ConnectAccount'
import DoxNotification from 'components/badges/DoxNotification'
import List from 'components/badges/List'
import LoadingTitle from 'components/badges/LoadingTitle'
import OriginalContractsStore from 'stores/OriginalContractsStore'
import ProofStore from 'stores/ProofStore'
import Scrollbar from 'components/Scrollbar'
import Title from 'components/Title'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  height,
  space,
} from 'classnames/tailwind'
import useProofsAvailableToMint from 'hooks/useProofsAvailableToMint'

const badgesContainer = classnames(
  space('space-y-6'),
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-stretch'),
  height('h-full')
)

function BadgesSuspended() {
  const { account, walletsToNotifiedOfBeingDoxxed } = useSnapshot(WalletStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { contractsOwned } = useSnapshot(OriginalContractsStore)
  const originalTokensOwned = contractsOwned
  const proofsAvailableToMint = useProofsAvailableToMint()

  const hasUnminted = proofsAvailableToMint.length > 0

  const shouldNotify =
    !!account &&
    !walletsToNotifiedOfBeingDoxxed[account] &&
    originalTokensOwned.length > 0 &&
    hasUnminted

  return (
    <div className={badgesContainer}>
      <Title
        title="Create ZK badges"
        subtitle={
          hasUnminted
            ? 'Looks like you can create ZK badges for this wallet'
            : proofsCompleted.length
            ? 'You generated all available ZK badges for this wallet'
            : 'Once you’ve created a ZK proof, you will be able to mint ZK badges for your anonymous wallets'
        }
      />
      <Scrollbar>
        {shouldNotify ? <DoxNotification account={account} /> : <List />}
      </Scrollbar>
    </div>
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
