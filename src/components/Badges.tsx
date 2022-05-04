import { CardHeader, SubHeaderDescription } from 'components/Text'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import BadgesHintCard from 'components/BadgesHintCard'
import BadgesList from 'components/BadgesList'
import Button from 'components/Button'
import WalletStore from 'stores/WalletStore'
import configuredModal from 'helpers/web3Modal'

function Badges() {
  const { account } = useSnapshot(WalletStore)

  return (
    <div className={space('space-y-6')}>
      <div className={space('space-y-2')}>
        <CardHeader color="text-pink">
          {!account ? 'Then' : 'Create ZK badges'}
        </CardHeader>
        <SubHeaderDescription>
          {!account
            ? 'Once you’ve created ZK proof, create badges for your anonymous wallet.'
            : 'Looks like you can create ZK badges for this wallet.'}
        </SubHeaderDescription>
      </div>
      {account ? (
        <BadgesList />
      ) : (
        <BadgesHintCard
          text="You must disconnect your first wallet after ZK proof is made, and then
        reconnect with a new one for the magic to work."
        >
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
        </BadgesHintCard>
      )}
    </div>
  )
}

export default Badges
