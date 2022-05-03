import { HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import WalletButton from 'components/WalletButton'
import WalletStore from 'stores/WalletStore'

function Proofs() {
  return (
    <>
      <HeaderText>ZK proofs that you can generate:</HeaderText>
      <ListOfAvailableZKProofs />
    </>
  )
}

function GenerateCard() {
  const { account } = useSnapshot(WalletStore)

  return (
    <Card color="yellow" shadow>
      {account ? <Proofs /> : <WalletButton />}
    </Card>
  )
}

export default GenerateCard
