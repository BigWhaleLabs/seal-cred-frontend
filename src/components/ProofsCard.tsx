import { AccentText, CardDescription, CardHeader } from 'components/Text'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import CardSeparator from 'components/CardSeparator'
import ConnectAccount from 'components/ConnectAccount'
import CustomScrollbar from 'components/CustomScrollBar'
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
import useBreakpoints from 'helpers/useBreakpoints'

const titleContainer = space('space-y-2')
const hintContainer = margin('mt-2')

const proofCardZKButtonContainer = classnames(
  display('flex'),
  flexDirection('flex-col-reverse', 'lg:flex-col'),
  alignItems('items-center'),
  width('w-full', 'lg:w-fit')
)
function ZkProofSavedMessage() {
  return (
    <div className={hintContainer}>
      <AccentText small color="text-blue-500">
        Your ZK Proof will save in the browser while you switch wallets.
      </AccentText>
    </div>
  )
}

const proofContainer = classnames(margin('mr-5'))

function Proofs() {
  const { proofsCompleted } = useSnapshot(proofStore)

  return (
    <>
      <div className={titleContainer}>
        <CardHeader color="text-yellow">Start proofing!</CardHeader>
        <CardDescription>Generate your ZK proof</CardDescription>
      </div>
      <div className={proofContainer}>
        <CustomScrollbar maxHeight={320}>
          <ListOfReadyZKProofs />
          <ListOfAvailableZKProofs />
        </CustomScrollbar>
        {proofsCompleted.length > 0 && <ZkProofSavedMessage />}
      </div>
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
          <Proofs />
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
