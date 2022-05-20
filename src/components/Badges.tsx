import { AccentText, CardDescription, CardHeader } from 'components/Text'
import { Suspense } from 'react'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import BadgesHintCard from 'components/BadgesHintCard'
import BadgesList from 'components/BadgesList'
import Button from 'components/Button'
import Card from 'components/Card'
import ProofStore from 'stores/ProofStore'
import Scrollbar from 'components/Scrollbar'
import WalletStore from 'stores/WalletStore'
import useContractAddressesOwned from 'hooks/useContractAddressesOwned'
import useProofsAvailableToMint from 'hooks/useProofsAvailableToMint'

const DoxNotification = ({ account }: { account: string }) => (
  <BadgesHintCard
    text={
      <>
        <AccentText color="text-secondary">Hold up...</AccentText> this wallet
        has NFTs (It’s doxxed). You should make sure your anonymous wallet is
        connected first before creating badges. Unless you plan to build badges
        on this wallet.
      </>
    }
  >
    <Button
      small
      primary
      onClick={() =>
        (WalletStore.walletsToNotifiedOfBeingDoxxed[account] = true)
      }
    >
      I understand, show badges
    </Button>
  </BadgesHintCard>
)

interface ZkBadgesTitleProps {
  hasAccount: boolean
  hasUnminted: boolean
  allProofsCompleted: boolean
}
const ZkBadgesTitle = ({
  hasAccount,
  hasUnminted,
  allProofsCompleted,
}: ZkBadgesTitleProps) => (
  <div className={space('space-y-2')}>
    <CardHeader color="text-secondary">
      {hasAccount ? 'Create ZK badges' : 'Then'}
    </CardHeader>
    <CardDescription>
      {hasAccount && hasUnminted
        ? 'Looks like you can create ZK badges for this wallet'
        : allProofsCompleted
        ? 'You generated all available ZK badges for this wallet'
        : 'Once you’ve created a ZK proof, you will be able to mint ZK badges for your anonymous wallets'}
    </CardDescription>
  </div>
)

const ConnectAnonymousWallet = () => (
  <BadgesHintCard text="You must switch from your first wallet after ZK proof is made to an anonymous wallet for the magic to work.">
    <Button
      withArrow
      onClick={async () => {
        await WalletStore.connect(true)
      }}
    >
      Connect your anonymous wallet
    </Button>
  </BadgesHintCard>
)

function Badges() {
  const { account, walletsToNotifiedOfBeingDoxxed } = useSnapshot(WalletStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const originalTokensOwned = useContractAddressesOwned('original')
  const proofsAvailableToMint = useProofsAvailableToMint()

  const hasUnminted = proofsAvailableToMint.length > 0

  const shouldNotify =
    !!account &&
    !walletsToNotifiedOfBeingDoxxed[account] &&
    originalTokensOwned.length > 0 &&
    hasUnminted

  return (
    <div className={space('space-y-6')}>
      <ZkBadgesTitle
        hasAccount={!!account}
        hasUnminted={hasUnminted}
        allProofsCompleted={!!proofsCompleted.length}
      />

      {account ? (
        <Scrollbar maxHeight={270}>
          {shouldNotify ? (
            <DoxNotification account={account} />
          ) : (
            <BadgesList />
          )}
        </Scrollbar>
      ) : (
        <ConnectAnonymousWallet />
      )}
    </div>
  )
}

const titleContainer = space('space-y-2')
const BadgesFallback = () => (
  <div className={titleContainer}>
    <CardHeader color="text-accent">Also loading...</CardHeader>
    <CardDescription>
      Please, be patient, I can be slow at times
    </CardDescription>
  </div>
)

export default function () {
  return (
    <Card shadow color="secondary">
      <Suspense fallback={<BadgesFallback />}>
        <Badges />
      </Suspense>
    </Card>
  )
}
