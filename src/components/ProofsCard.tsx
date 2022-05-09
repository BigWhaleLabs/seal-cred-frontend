import {
  AccentText,
  BodyText,
  CardDescription,
  CardHeader,
} from 'components/Text'
import { Suspense, lazy } from 'react'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import CardSeparator from 'components/CardSeparator'
import ConnectAccount from 'components/ConnectAccount'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import ListOfReadyZKProofs from 'components/ListOfReadyZKProofs'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'
import ZkProofButton from 'components/ZkProofButton'
import classnames, {
  alignItems,
  display,
  flexDirection,
  margin,
  space,
  width,
} from 'classnames/tailwind'
import proofStore from 'stores/ProofStore'
import useBreakpoints from 'helpers/useBreakpoints'

const titleContainer = space('space-y-2')
const hintContainer = margin('mt-2')

const proofCardZKButtonContainer = classnames(
  display('flex'),
  flexDirection('flex-col-reverse', 'lg:flex-col'),
  alignItems('items-center'),
  width('w-full', 'lg:w-fit')
)
function ZkProofSavedMessage({ allGenerated }: { allGenerated?: boolean }) {
  return (
    <div className={hintContainer}>
      <AccentText small color="text-blue-500">
        {allGenerated ? 'All your' : 'Your'} ZK Proof will save in the browser
        while you switch wallets.
      </AccentText>
    </div>
  )
}

function Proofs() {
  const { originalContracts } = useSnapshot(StreetCredStore)
  const { proofsCompleted } = useSnapshot(proofStore)
  const { account } = useSnapshot(WalletStore)

  const canGenerateProof =
    originalContracts && account
      ? new Set(
          proofsCompleted
            .filter((proof) => account === proof.account)
            .map((proof) => proof.contract)
        ).size === originalContracts?.owned.length
      : false

  return (
    <>
      {originalContracts && (
        <>
          <div className={titleContainer}>
            <CardHeader color="text-yellow">
              {canGenerateProof ? 'Start proofing!' : 'All proofed out'}
            </CardHeader>
            <CardDescription>
              {canGenerateProof
                ? `Generate your ZK proof`
                : `You generated all available ZK proof from this wallet`}
            </CardDescription>
          </div>
          <ListOfReadyZKProofs />
          <ListOfAvailableZKProofs />
          {proofsCompleted.length > 0 && (
            <ZkProofSavedMessage allGenerated={!canGenerateProof} />
          )}
        </>
      )}
    </>
  )
}

function ProofsSuspended() {
  return (
    <Suspense
      fallback={<CardHeader color="text-yellow">Fetching proofs...</CardHeader>}
    >
      <Proofs />
    </Suspense>
  )
}

function ReadyProofs() {
  return (
    <>
      <div className={titleContainer}>
        <CardHeader color="text-yellow">Your saved ZK Proof</CardHeader>
      </div>
      <ListOfReadyZKProofs />
      <ZkProofSavedMessage />
    </>
  )
}

function ProofsCard() {
  const { account } = useSnapshot(WalletStore)
  const { proofsCompleted } = useSnapshot(proofStore)
  const { lg } = useBreakpoints()

  return (
    <div className={proofCardZKButtonContainer}>
      <Card color="yellow" shadow>
        {account ? (
          <ProofsSuspended />
        ) : proofsCompleted.length > 0 ? (
          <ReadyProofs />
        ) : (
          <ConnectAccount />
        )}
      </Card>
      {lg && (
        <>
          <CardSeparator number={1} from="yellow" vertical />
          <ZkProofButton />
        </>
      )}
    </div>
  )
}

export default ProofsCard
