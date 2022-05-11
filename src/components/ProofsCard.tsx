import { AccentText, CardDescription, CardHeader } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import BadgesHintCard from 'components/BadgesHintCard'
import Card from 'components/Card'
import CardSeparator from 'components/CardSeparator'
import ConnectAccount from 'components/ConnectAccount'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import ListOfReadyZKProofs from 'components/ListOfReadyZKProofs'
import ProofStore from 'stores/ProofStore'
import Scrollbar from 'components/Scrollbar'
import WalletStore from 'stores/WalletStore'
import ZkProofButton from 'components/ZkProofButton'
import classnames, {
  alignItems,
  display,
  flexDirection,
  height,
  margin,
  space,
  width,
} from 'classnames/tailwind'
import useBreakpoints from 'helpers/useBreakpoints'
import useProofAddressesAvailableToCreate from 'helpers/useProofAddressesAvailableToCreate'

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
        Created ZK proofs are saved in the browser even if you switch wallets.
      </AccentText>
    </div>
  )
}

const proofsStyles = classnames(height('lg:h-72', 'h-min'))

function Proofs() {
  const proofAddressesAvailableToCreate = useProofAddressesAvailableToCreate()
  const { proofsCompleted } = useSnapshot(ProofStore)

  const allGenerated =
    proofsCompleted.length > 0 && proofAddressesAvailableToCreate.length === 0
  const noWayToGenerate =
    proofsCompleted.length === 0 && proofAddressesAvailableToCreate.length === 0

  return (
    <>
      <div className={titleContainer}>
        <CardHeader color="text-yellow">
          {allGenerated ? 'All proofed out' : 'Start proofing!'}
        </CardHeader>
        <CardDescription>
          {allGenerated
            ? 'You generated all available ZK proofs for this wallet'
            : 'Generate ZK proofs'}
        </CardDescription>
      </div>
      {noWayToGenerate && (
        <BadgesHintCard text="You don't have any supported tokens." />
      )}
      <Scrollbar maxHeight={320}>
        <div className={proofsStyles}>
          <ListOfReadyZKProofs />
          <ListOfAvailableZKProofs />
        </div>
      </Scrollbar>
      {proofsCompleted.length > 0 && <ZkProofSavedMessage />}
    </>
  )
}

function ReadyProofs() {
  return (
    <>
      <div className={titleContainer}>
        <CardHeader color="text-yellow">Your saved ZK Proofs</CardHeader>
      </div>
      <Scrollbar maxHeight={320}>
        <ListOfReadyZKProofs />
      </Scrollbar>
      <ZkProofSavedMessage />
    </>
  )
}

function ProofsCard() {
  const { account } = useSnapshot(WalletStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { lg } = useBreakpoints()

  return (
    <div className={proofCardZKButtonContainer}>
      <Card color="yellow" shadow>
        {account ? (
          <Suspense
            fallback={
              <div className={titleContainer}>
                <CardHeader color="text-yellow">Loading...</CardHeader>
                <CardDescription>
                  Please, wait until I load supported NFTs, it can take a minute
                </CardDescription>
              </div>
            }
          >
            <Proofs />
          </Suspense>
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
