import { useSnapshot } from 'valtio'
import Card, { CardDescription, CardTitle } from 'components/Card'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import ListOfReadyZKProofs from 'components/ListOfReadyZKProofs'
import WalletButton from 'components/WalletButton'
import WalletStore from 'stores/WalletStore'

function Proofs() {
  return (
    <>
      <div>
        <CardTitle color="text-yellow">Start proofing!</CardTitle>
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
      {account ? <Proofs /> : <WalletButton />}
    </Card>
  )
}

export default ProofsCard
