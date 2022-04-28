import { HeaderText, SubheaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
// import MintedDerivativeNft from 'components/MintedDerivativeNft'
// import ProofStore from 'stores/ProofStore'
import { Suspense } from 'react'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import ListOfReadyZKProofs from 'components/ListOfReadyZKProofs'
import OriginalContractsOwned from 'components/OriginalContractsOwned'
import SupportedContracts from 'components/SupportedContracts'
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
      {/* TODO: should display the derivative NFTs that can be minted (but that are not minted yet) */}
      <HeaderText>Derivative NFTs that you own:</HeaderText>
      {/* <MintedDerivativeNft /> */}
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
      <Suspense
        fallback={<SubheaderText>Fetching avaliable tokens...</SubheaderText>}
      >
        <SupportedContracts />
      </Suspense>
      {account && <Proofs />}
    </Card>
  )
}

export default Main
