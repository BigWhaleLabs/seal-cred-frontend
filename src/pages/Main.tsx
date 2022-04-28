import { HeaderText, SubheaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
// import MintedDerivativeNft from 'components/MintedDerivativeNft'
// import ProofStore from 'stores/ProofStore'
import { Suspense, useEffect } from 'react'
import OriginalContractsOwned from 'components/OriginalContractsOwned'
import StreetCredStore from 'stores/StreetCredStore'
import SupportedContracts from 'components/SupportedContracts'
import UnmintedDerivatives from 'components/UnmintedDerivatives'
import Wallet from 'components/Wallet'
import WalletStore from 'stores/WalletStore'
// import ZKProofReady from 'components/ZKProofReady'

function Proofs() {
  // const { proofsReady } = useSnapshot(ProofStore)
  const { account } = useSnapshot(WalletStore)

  useEffect(() => {
    StreetCredStore.handleAccountChange(account)
  }, [account])

  return (
    <>
      <HeaderText>Supported NFTs that you own:</HeaderText>
      <OriginalContractsOwned />
      <HeaderText>ZK proofs that you can generate:</HeaderText>
      {/* {proofsCanGenerate.map((record) => (
        <ZKProofGenerate {...record} />
      ))} */}
      {/* TODO: Display "Supported NFTs that you own" minus the ZK proofs that are already generated (or take it from ProofStore?) */}
      {/* TODO: each ZK proof that can be generated should have the button "generate", which should call ProofStore.generate method */}
      {/* TODO: proofs that are being generated should be taken from ProofStore, just being displayed here, no actual business-logic should be present in the UI */}
      {/* TODO: we should be able to generate multiple proofs at a time (even though they are queued) */}
      {/* TODO: we should display the queue position of the jobs */}
      <HeaderText>ZK proofs that you generated:</HeaderText>
      {/* {[...proofsReady.keys()].map((address) => (
        <ZKProofReady address={address} />
      ))} */}
      <HeaderText>Derivative NFTs that you can mint:</HeaderText>
      <UnmintedDerivatives />
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
