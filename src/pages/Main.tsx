import { HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import DerivativeContractsOwned from 'components/DerivativeContractsOwned'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import ListOfReadyZKProofs from 'components/ListOfReadyZKProofs'
import OriginalContractsOwned from 'components/OriginalContractsOwned'
import SupportedContracts from 'components/SupportedContracts'
import UnmintedDerivatives from 'components/UnmintedDerivatives'
import WalletStore from 'stores/WalletStore'
import ZkProofButton from 'components/ZkProofButton'

function Proofs() {
  return (
    <>
      <HeaderText size="3xl">Supported NFTs that you own:</HeaderText>
      <OriginalContractsOwned />
      <HeaderText size="3xl">ZK proofs that you can generate:</HeaderText>
      <ListOfAvailableZKProofs />
      <HeaderText size="3xl">ZK proofs that you generated:</HeaderText>
      <ListOfReadyZKProofs />
      <HeaderText size="3xl">Derivative NFTs that you can mint:</HeaderText>
      <UnmintedDerivatives />
      <HeaderText size="3xl">Derivative NFTs that you own:</HeaderText>
      <DerivativeContractsOwned />
    </>
  )
}

function Main() {
  const { account } = useSnapshot(WalletStore)

  return (
    <>
      <Card shadow color="green">
        <HeaderText size="4xl" bold>
          Supported NFTs:
        </HeaderText>
        <SupportedContracts />
        {account && <Proofs />}
      </Card>
      <ZkProofButton />
    </>
  )
}

export default Main
