import { AccentText, CardDescription, CardHeader } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import BadgesHintCard from 'components/BadgesHintCard'
import BadgesList from 'components/BadgesList'
import Button from 'components/Button'
import Card from 'components/Card'
import Scrollbar from 'components/Scrollbar'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  height,
  space,
} from 'classnames/tailwind'
import useContractAddressesOwned from 'hooks/useContractAddressesOwned'
import useDerivativeTokensOwned from 'hooks/useDerivativeTokensOwned'
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
  hasDerivatives: boolean
}
const ZkBadgesTitle = ({
  hasAccount,
  hasUnminted,
  hasDerivatives,
}: ZkBadgesTitleProps) => (
  <div className={space('space-y-2')}>
    <CardHeader color="text-secondary">
      {hasAccount ? 'Create ZK badges' : 'Then'}
    </CardHeader>
    <CardDescription>
      {hasAccount && hasUnminted
        ? 'Looks like you can create ZK badges for this wallet'
        : hasDerivatives
        ? 'You’ve minted all of your available badges'
        : 'Once you’ve created a ZK proof, you will be able to mint ZK badges for your anonymous wallets'}
    </CardDescription>
  </div>
)

const ConnectAnonymousWallet = () => (
  <BadgesHintCard>
    <p>
      <AccentText color="text-secondary">1.</AccentText> Create proof with any
      NFTs in your wallet.
    </p>
    <p>
      <AccentText color="text-secondary">2.</AccentText> Create or use a new
      wallet (anonymous wallet) and connect to SealCred again.
    </p>
    <p>
      <AccentText color="text-secondary">3.</AccentText> Mint badges using the
      anonymous wallet.
    </p>
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

const badgesContainer = classnames(
  space('space-y-6'),
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-stretch'),
  height('h-full')
)

function Badges() {
  const { account, walletsToNotifiedOfBeingDoxxed } = useSnapshot(WalletStore)
  const derivativeTokensOwned = useDerivativeTokensOwned()
  const originalTokensOwned = useContractAddressesOwned('original')
  const proofsAvailableToMint = useProofsAvailableToMint()

  const hasUnminted = proofsAvailableToMint.length > 0
  const hasDerivativeTokens = Object.keys(derivativeTokensOwned).length

  const shouldNotify =
    !!account &&
    !walletsToNotifiedOfBeingDoxxed[account] &&
    originalTokensOwned.length > 0 &&
    hasUnminted

  return (
    <div className={badgesContainer}>
      <ZkBadgesTitle
        hasAccount={!!account}
        hasDerivatives={!!hasDerivativeTokens}
        hasUnminted={hasUnminted}
      />

      {account ? (
        <Scrollbar>
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
