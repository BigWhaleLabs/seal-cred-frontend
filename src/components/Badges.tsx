import { CardDescription, CardHeader } from 'components/Text'
import { fontSize, space } from 'classnames/tailwind'
import { proxy, useSnapshot } from 'valtio'
import BadgesHintCard from 'components/BadgesHintCard'
import BadgesList from 'components/BadgesList'
import Button from 'components/Button'
import Card from 'components/Card'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'
import configuredModal from 'helpers/web3Modal'

function Badges() {
  const { account } = useSnapshot(WalletStore)
  const { derivativeContracts, ledger, derivativeTokenIds } =
    useSnapshot(SealCredStore)
  const derivatives = proxy(derivativeContracts)
  const scLedger = proxy(ledger)

  const ownedDerivatives = derivatives
    ? Object.keys(derivativeTokenIds).map((address) =>
        derivatives.find((contract) => contract.address === address)
      )
    : []

  const unownedDerivativeToOriginalAddressesMap = {} as {
    [derivativeAddress: string]: string
  }

  const unownedDerivativeRecords = Object.keys(
    unownedDerivativeToOriginalAddressesMap
  ).map((address) => scLedger[unownedDerivativeToOriginalAddressesMap[address]])

  const ownedDerivativesLength = ownedDerivatives.length
  const unownedLedgerRecordsWithProofs = unownedDerivativeRecords.length
  const badgesAmount = ownedDerivativesLength + unownedLedgerRecordsWithProofs

  const isEmpty = badgesAmount < 1

  return (
    <Card shadow color="pink">
      <div className={space('space-y-6')}>
        <div className={space('space-y-2')}>
          <CardHeader color="text-pink">
            {!account ? 'Then' : 'Create ZK badges'}
          </CardHeader>
          <CardDescription>
            {!account || isEmpty
              ? 'Once you’ve created ZK proof, create badges for your anonymous wallet'
              : 'Looks like you can create ZK badges for this wallet'}
          </CardDescription>
        </div>
        {account ? (
          <BadgesList />
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
