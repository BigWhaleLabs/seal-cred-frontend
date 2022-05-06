import { AccentText, CardDescription, CardHeader } from 'components/Text'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ConnectAccount from 'components/ConnectAccount'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import ListOfReadyZKProofs from 'components/ListOfReadyZKProofs'
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
import useWindowDimensions from 'helpers/useWindowDimensions'

const titleContainer = space('space-y-2')
const hintContainer = margin('mt-2')

const proofCardZKButtonContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  width('w-full', 'lg:w-fit')
)

function Proofs() {
  const { proofsCompleted } = useSnapshot(proofStore)

  return (
    <>
      <div className={titleContainer}>
        <CardHeader color="text-yellow">Start proofing!</CardHeader>
        <CardDescription>Generate your ZK proof</CardDescription>
      </div>
      <ListOfReadyZKProofs />
      <ListOfAvailableZKProofs />
      {proofsCompleted.length > 0 && (
        <div className={hintContainer}>
          <AccentText color="text-blue-500">
            Your ZK Proof will save in the browser while you switch wallets.
          </AccentText>
        </div>
      )}
    </>
  )
}

function ReadyProofs() {
  return (
    <>
      <div className={titleContainer}>
        <CardHeader color="text-yellow">Your saved ZK Proof</CardHeader>
      </div>
      <ListOfReadyZKProofs />
      <div className={hintContainer}>
        <AccentText color="text-blue-500">
          Your ZK Proof will save in the browser while you switch wallets.
        </AccentText>
      </div>
    </>
  )
}

function ProofsCard() {
  const { account } = useSnapshot(WalletStore)
  const { proofsCompleted } = useSnapshot(proofStore)
  const { width } = useWindowDimensions()
  const mobile = width < 600

  return (
    <div className={proofCardZKButtonContainer}>
      <Card color="yellow" shadow>
        {account ? (
          <Proofs />
        ) : proofsCompleted.length > 0 ? (
          <ReadyProofs />
        ) : (
          <ConnectAccount />
        )}
      </Card>
      {!mobile && <ZkProofButton />}
    </div>
  )
}

export default ProofsCard
