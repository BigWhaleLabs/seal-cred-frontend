import { AccentText, CardDescription, CardHeader } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import BadgesHintCard from 'components/BadgesHintCard'
import Card from 'components/Card'
import CardSeparator from 'components/CardSeparator'
import ConnectAccount from 'components/ConnectAccount'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import ListOfInProgressZKProofs from 'components/ListOfInProgressZKProofs'
import ListOfReadyZKProofs from 'components/ListOfReadyZKProofs'
import ProofStore from 'stores/ProofStore'
import Scrollbar from 'components/Scrollbar'
import WalletStore from 'stores/WalletStore'
import ZkProofButton from 'components/ZkProofButton'
import classnames, {
  alignItems,
  display,
  flexDirection,
  space,
  width,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

const titleContainer = space('space-y-2')
const innerScrollableBlock = space('space-y-2')
const proofContainer = space('space-y-6')
const proofContentBlock = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-4')
)

const proofCardZKButtonContainer = classnames(
  display('flex'),
  flexDirection('flex-col-reverse', 'lg:flex-col'),
  alignItems('items-center'),
  width('w-full', 'lg:w-fit')
)
function ZkProofSavedMessage() {
  return (
    <AccentText small primary color="text-primary">
      Created ZK proofs are saved in the browser even if you switch wallets.
    </AccentText>
  )
}

function Proofs() {
  const proofAddressesAvailableToCreate = useProofAddressesAvailableToCreate()
  const { proofsCompleted, proofsInProgress } = useSnapshot(ProofStore)
  const { account } = useSnapshot(WalletStore)

  const allGenerated =
    proofsCompleted.length > 0 &&
    proofAddressesAvailableToCreate.length === 0 &&
    proofsInProgress.length === 0
  const nothingToGenerate =
    proofsCompleted.length === 0 &&
    proofAddressesAvailableToCreate.length === 0 &&
    proofsInProgress.length === 0

  return (
    <div className={proofContainer}>
      <div className={titleContainer}>
        <CardHeader color="text-accent">
          {allGenerated ? 'All proofed out' : 'Start proofing!'}
        </CardHeader>
        <CardDescription>
          {allGenerated
            ? 'You generated all available ZK proofs for this wallet'
            : 'Generate ZK proofs'}
        </CardDescription>
      </div>
      {nothingToGenerate && (
        <BadgesHintCard text="You don't have any supported tokens." />
      )}
      <div className={proofContentBlock}>
        <Scrollbar maxHeight={300}>
          <div className={innerScrollableBlock}>
            <ListOfReadyZKProofs />
            {account && (
              <>
                <ListOfInProgressZKProofs />
                <ListOfAvailableZKProofs />
              </>
            )}
          </div>
        </Scrollbar>
        {proofsCompleted.length > 0 && <ZkProofSavedMessage />}
      </div>
    </div>
  )
}

function ReadyProofs() {
  return (
    <>
      <div className={titleContainer}>
        <CardHeader color="text-accent">Your saved ZK Proofs</CardHeader>
      </div>
      <div className={proofContentBlock}>
        <Scrollbar maxHeight={300}>
          <ListOfReadyZKProofs />
        </Scrollbar>
        <ZkProofSavedMessage />
      </div>
    </>
  )
}

export default function () {
  const { account } = useSnapshot(WalletStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { lg } = useBreakpoints()

  return (
    <div className={proofCardZKButtonContainer}>
      <Card color="accent" shadow>
        {account ? (
          <Suspense
            fallback={
              <div className={titleContainer}>
                <CardHeader color="text-accent">Loading...</CardHeader>
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
          <CardSeparator
            numberOfLines={1}
            gradient="accent-to-transparent"
            vertical
          />
          <ZkProofButton />
        </>
      )}
    </div>
  )
}
