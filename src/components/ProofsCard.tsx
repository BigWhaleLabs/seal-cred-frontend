import { CardDescription, CardHeader } from 'components/Text'
import { margin } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ConnectAccount from 'components/ConnectAccount'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import ListOfReadyZKProofs from 'components/ListOfReadyZKProofs'
import WalletStore from 'stores/WalletStore'

const titleContainer = margin('mb-2')

function Proofs() {
  return (
    <>
      <div>
        <div className={titleContainer}>
          <CardHeader color="text-yellow">Start proofing!</CardHeader>
        </div>
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
