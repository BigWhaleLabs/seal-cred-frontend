import { CardDescription, CardHeader } from 'components/Text'
import { fontSize, space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import BadgesHintCard from 'components/BadgesHintCard'
import BadgesList from 'components/BadgesList'
import Button from 'components/Button'
import Card from 'components/Card'
import ProofStore from 'stores/ProofStore'
import Scrollbar from 'components/Scrollbar'
import WalletStore from 'stores/WalletStore'
import configuredModal from 'helpers/web3Modal'
import useDerivativesOwned from 'helpers/useDerivativesOwned'

function Badges() {
  const { account } = useSnapshot(WalletStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const derivativesOwned = useDerivativesOwned()

  const noBadges =
    !Object.keys(derivativesOwned).length && !proofsCompleted.length

  return (
    <Card shadow color="pink">
      <div className={space('space-y-6')}>
        <div className={space('space-y-2')}>
          <CardHeader color="text-pink">
            {!account ? 'Then' : 'Create ZK badges'}
          </CardHeader>
          <CardDescription>
            {!account || noBadges
              ? 'Once you’ve created ZK proof, create badges for your anonymous wallet'
              : 'Looks like you can create ZK badges for this wallet'}
          </CardDescription>
        </div>
        {account ? (
          <Scrollbar maxHeight={330}>
            <BadgesList />
          </Scrollbar>
        ) : (
          <BadgesHintCard
            text="You must disconnect your first wallet after ZK proof is made, and then
        reconnect with a new one for the magic to work."
          >
            <div className={fontSize('text-sm', 'lg:text-base')}>
              <Button
                colors="tertiary"
                arrow
                onClick={async () => {
                  configuredModal.clearCachedProvider()
                  await WalletStore.connect()
                }}
              >
                Connect your anonymous wallet
              </Button>
            </div>
          </BadgesHintCard>
        )}
      </div>
    </Card>
  )
}

export default Badges
