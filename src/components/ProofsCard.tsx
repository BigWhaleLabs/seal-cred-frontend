import { CardDescription, CardHeader } from 'components/Text'
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
  justifyContent,
  space,
  width,
} from 'classnames/tailwind'
import useWindowDimensions from 'helpers/useWindowDimensions'

const titleContainer = classnames(space('space-y-2'))

const proofCardZKButtonContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  width('w-full', 'sm:w-fit')
)

function Proofs() {
  return (
    <>
      <div className={titleContainer}>
        <CardHeader color="text-yellow">Start proofing!</CardHeader>
        <CardDescription>Generate your ZK proof</CardDescription>
      </div>
      <ListOfReadyZKProofs />
      <ListOfAvailableZKProofs />
    </>
  )
}

function ProofsCard() {
  const { account } = useSnapshot(WalletStore)
  const { width } = useWindowDimensions()
  const mobile = width < 640

  return (
    <div className={proofCardZKButtonContainer}>
      <Card color="yellow" shadow>
        {account ? <Proofs /> : <ConnectAccount />}
      </Card>
      {!mobile && <ZkProofButton />}
    </div>
  )
}

export default ProofsCard
