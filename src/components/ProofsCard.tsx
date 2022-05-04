import { CardDescription, CardHeader } from 'components/Text'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ConnectAccount from 'components/ConnectAccount'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import ListOfReadyZKProofs from 'components/ListOfReadyZKProofs'
import WalletStore from 'stores/WalletStore'
import classnames, { space } from 'classnames/tailwind'

const titleContainer = classnames(space('space-y-2'))

function Proofs() {
  return (
    <>
      <div className={titleContainer}>
        <CardHeader color="text-yellow">Start proofing!</CardHeader>
        <CardDescription>Generate your ZK proof</CardDescription>
      </div>
      <ListOfReadyZKProofs />
      <ListOfAvailableZKProofs />
    </>
  )
}

function ProofsCard() {
  const { account } = useSnapshot(WalletStore)

  return (
    <Card color="yellow" shadow>
      {account ? <Proofs /> : <ConnectAccount />}
    </Card>
  )
}

export default ProofsCard
