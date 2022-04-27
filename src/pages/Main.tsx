import { HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import ListOfReadyZKProofs from 'components/ListOfReadyZKProofs'
import MintedDerivativeNft from 'components/MintedDerivativeNft'
import SupportedNFTs from 'components/SupportedNFTs'
import Wallet from 'components/Wallet'
import WalletStore from 'stores/WalletStore'

function Proofs() {
  return (
    <>
      <HeaderText>Supported NFTs that you own:</HeaderText>
      <SupportedNFTs />
      <HeaderText>ZK proofs that you can generate:</HeaderText>
      <ListOfAvailableZKProofs />
      <HeaderText>ZK proofs that you generated:</HeaderText>
      <ListOfReadyZKProofs />
      <HeaderText>Derivative NFTs that you can mint:</HeaderText>
      {/* TODO: should display the derivative NFTs that can be minted (but that are not minted yet) */}
      <HeaderText>Derivative NFTs that you own:</HeaderText>
      <MintedDerivativeNft />
    </>
  )
}

function Main() {
  const { account } = useSnapshot(WalletStore)

  return (
    <Card>
      <HeaderText>That's you:</HeaderText>
      <Wallet />
      {account && <Proofs />}
    </Card>
  )
}

export default Main
