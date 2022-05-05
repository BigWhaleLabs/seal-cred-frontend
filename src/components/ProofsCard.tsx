import { AccentText, CardDescription, CardHeader } from 'components/Text'
import { margin, space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ConnectAccount from 'components/ConnectAccount'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import ListOfReadyZKProofs from 'components/ListOfReadyZKProofs'
import WalletStore from 'stores/WalletStore'
import proofStore from 'stores/ProofStore'

const titleContainer = space('space-y-2')
const hintContainer = margin('mt-2')

function Proofs() {
  const { proofsCompleted } = useSnapshot(proofStore)

  return (
    <>
      <div className={titleContainer}>
        <CardHeader color="text-yellow">Start proofing!</CardHeader>
        <CardDescription>Generate your ZK proof</CardDescription>
      </div>
      <ListOfReadyZKProofs />
      <ListOfAvailableZKProofs />
      {proofsCompleted.length > 0 && (
        <div className={hintContainer}>
          <AccentText color="text-blue-500">
            Your ZK Proof will save in the browser while you switch wallets.
          </AccentText>
        </div>
      )}
    </>
  )
}

function ReadyProofs() {
  return (
    <>
      <div className={titleContainer}>
        <CardHeader color="text-yellow">Your saved ZK Proof</CardHeader>
      </div>
      <ListOfReadyZKProofs />
      <div className={hintContainer}>
        <AccentText color="text-blue-500">
          Your ZK Proof will save in the browser while you switch wallets.
        </AccentText>
      </div>
    </>
  )
}

function ProofsCard() {
  const { account } = useSnapshot(WalletStore)
  const { proofsCompleted } = useSnapshot(proofStore)

  return (
    <Card color="yellow" shadow>
      {account ? (
        <Proofs />
      ) : proofsCompleted.length > 0 ? (
        <ReadyProofs />
      ) : (
        <ConnectAccount />
      )}
    </Card>
  )
}

export default ProofsCard
