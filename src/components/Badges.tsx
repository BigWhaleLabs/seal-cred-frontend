import { CardDescription, CardHeader } from 'components/Text'
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
import useBreakpoints from 'helpers/useBreakpoints'
import useDerivativeTokensOwned from 'helpers/useDerivativeTokensOwned'

function Badges() {
  const { account } = useSnapshot(WalletStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const derivativeTokensOwned = useDerivativeTokensOwned()
  const { sm, md } = useBreakpoints()

  const noBadges =
    !Object.keys(derivativeTokensOwned).length && !proofsCompleted.length

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
        <Scrollbar maxHeight={md ? 330 : sm ? 240 : 190}>
          <BadgesList />
        </Scrollbar>
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
