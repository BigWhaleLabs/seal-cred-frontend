import { HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import DerivativeContractsOwned from 'components/DerivativeContractsOwned'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import ListOfReadyZKProofs from 'components/ListOfReadyZKProofs'
import OriginalContractsOwned from 'components/OriginalContractsOwned'
import SupportedContracts from 'components/SupportedContracts'
import UnmintedDerivatives from 'components/UnmintedDerivatives'
import Wallet from 'components/Wallet'
import WalletStore from 'stores/WalletStore'

function Proofs() {
  return (
    <>
      <HeaderText>Supported NFTs that you own:</HeaderText>
      <OriginalContractsOwned />
      <HeaderText>ZK proofs that you can generate:</HeaderText>
      <ListOfAvailableZKProofs />
      <HeaderText>ZK proofs that you generated:</HeaderText>
      <ListOfReadyZKProofs />
      <HeaderText>Derivative NFTs that you can mint:</HeaderText>
      <UnmintedDerivatives />
      <HeaderText>Derivative NFTs that you own:</HeaderText>
      <DerivativeContractsOwned />
    </>
  )
}

function Main() {
  const { account } = useSnapshot(WalletStore)

  return (
    <Card>
      <HeaderText>That's you:</HeaderText>
      <Wallet />
      <HeaderText>Supported NFTs:</HeaderText>
      <SupportedContracts />
      {account && <Proofs />}
    </Card>
  )
}

export default Main
