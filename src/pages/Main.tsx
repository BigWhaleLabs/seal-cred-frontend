import { HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import BadgingCard from 'components/BadgingCard'
import Card from 'components/Card'
import DerivativeContractsOwned from 'components/DerivativeContractsOwned'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import ListOfReadyZKProofs from 'components/ListOfReadyZKProofs'
import OriginalContractsOwned from 'components/OriginalContractsOwned'
import ProofingCard from 'components/ProofingCard'
import SupportedContracts from 'components/SupportedContracts'
import UnmintedDerivatives from 'components/UnmintedDerivatives'
import WalletStore from 'stores/WalletStore'
import ZkProofButton from 'components/ZkProofButton'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
} from 'classnames/tailwind'

const proofingCardContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-start'),
  space('space-x-5'),
  justifyContent('justify-center')
)

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
    <>
      <div className={proofingCardContainer}>
        <ProofingCard />
        <BadgingCard />
      </div>
      {/* <Card shadow color="green">
        <HeaderText>Supported NFTs:</HeaderText>
        <SupportedContracts />
        {account && <Proofs />}
      </Card> */}
    </>
  )
}

export default Main
