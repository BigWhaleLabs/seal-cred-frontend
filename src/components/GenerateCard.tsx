import { HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import Wallet from 'components/Wallet'
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

  return <Card shadow>{account ? <Proofs /> : <Wallet />}</Card>
}

export default GenerateCard
