import { HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ProofStore from 'stores/ProofStore'
import React from 'react'
import SupportedNftWrapper from 'components/SupportedNft'
import Wallet from 'components/Wallet'
import WalletStore from 'stores/WalletStore'
import ZKProofReady from 'components/ZKProofReady'

function Proofs() {
  const { proofsReady } = useSnapshot(ProofStore)

  return (
    <>
      <HeaderText>Supported NFTs that you own:</HeaderText>
      <SupportedNftWrapper />
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
      {[...proofsReady.keys()].map((address) => (
        <ZKProofReady address={address} />
      ))}
      <HeaderText>Derivative NFTs that you can mint:</HeaderText>
      {/* TODO: should display the derivative NFTs that can be minted (but that are not minted yet) */}
      <HeaderText>Derivative NFTs that you own:</HeaderText>
      {/* TODO: should display the derivative NFTs that are already minted for the address */}
    </>
  )
}

export function MainContent() {
  const { account } = useSnapshot(WalletStore)

  return (
    <Card>
      <HeaderText>That's you:</HeaderText>
      <Wallet />
      {account && <Proofs />}
    </Card>
  )
}

function Main() {
  return (
    <React.Suspense fallback={'loading'}>
      <MainContent />
    </React.Suspense>
  )
}

export default Main
