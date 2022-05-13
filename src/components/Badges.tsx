import { AccentText, CardDescription, CardHeader } from 'components/Text'
import { Suspense } from 'react'
import { fontSize, space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import BadgesHintCard from 'components/BadgesHintCard'
import BadgesList from 'components/BadgesList'
import Button from 'components/Button'
import Card from 'components/Card'
import ProofStore from 'stores/ProofStore'
import Scrollbar from 'components/Scrollbar'
import WalletStore from 'stores/WalletStore'
import useDerivativeTokensOwned from 'helpers/useDerivativeTokensOwned'

function Badges() {
  const { account, notifiedOfNFTownership } = useSnapshot(WalletStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const derivativeTokensOwned = useDerivativeTokensOwned()

  const noBadges =
    !Object.keys(derivativeTokensOwned).length && !proofsCompleted.length

  const shouldNotify = !noBadges && account && !notifiedOfNFTownership[account]

  return (
    <div className={space('space-y-6')}>
      <div className={space('space-y-2')}>
        <CardHeader color="text-pink">
          {!account ? 'Then' : 'Create ZK badges'}
        </CardHeader>
        <CardDescription>
          {!account || noBadges
            ? 'Once you’ve created a ZK proof, you will be able to mint ZK badges for your anonymous wallets'
            : 'Looks like you can create ZK badges for this wallet'}
        </CardDescription>
      </div>
      {account ? (
        shouldNotify ? (
          <BadgesHintCard
            text={
              <>
                <AccentText color="text-pink">Hold up...</AccentText> this
                wallet has NFTs (It’s doxxed). You should make sure your
                anonymous wallet is connected first before creating badges.
                Unless you plan to build badges on this wallet.
              </>
            }
          >
            <Button
              small
              colors="primary"
              onClick={() => {
                WalletStore.notifiedOfNFTownership[account] = true
              }}
            >
              I understand, show badges
            </Button>
          </BadgesHintCard>
        ) : (
          <Scrollbar maxHeight={330}>
            <BadgesList />
          </Scrollbar>
        )
      ) : (
        <BadgesHintCard text="You must switch from your first wallet after ZK proof is made to an anonymous wallet for the magic to work.">
          <div className={fontSize('text-sm', 'lg:text-base')}>
            <Button
              colors="tertiary"
              arrow
              onClick={async () => {
                await WalletStore.connect(true)
              }}
            >
              Connect your anonymous wallet
            </Button>
          </div>
        </BadgesHintCard>
      )}
    </div>
  )
}

const titleContainer = space('space-y-2')
function BadgesSuspense() {
  return (
    <Card shadow color="pink">
      <Suspense
        fallback={
          <div className={titleContainer}>
            <CardHeader color="text-yellow">Also loading...</CardHeader>
            <CardDescription>
              Please, be patient, I can be slow at times
            </CardDescription>
          </div>
        }
      >
        <Badges />
      </Suspense>
    </Card>
  )
}

export default BadgesSuspense
