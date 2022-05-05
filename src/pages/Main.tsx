import { HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Badges from 'components/Badges'
import Card from 'components/Card'
import CardSeparator from 'components/CardSeparator'
import DerivativeContractsOwned from 'components/DerivativeContractsOwned'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import ListOfReadyZKProofs from 'components/ListOfReadyZKProofs'
import OriginalContractsOwned from 'components/OriginalContractsOwned'
import ProofsCard from 'components/ProofsCard'
import SupportedContracts from 'components/SupportedContracts'
import UnmintedDerivatives from 'components/UnmintedDerivatives'
import WalletStore from 'stores/WalletStore'
import ZkProofButton from 'components/ZkProofButton'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gridTemplateColumns,
  justifyContent,
  margin,
  space,
} from 'classnames/tailwind'
import useWindowDimensions from 'helpers/useWindowDimensions'

const mainBlock = classnames(
  display('flex'),
  flexDirection('flex-col', 'sm:flex-row'),
  alignItems('items-center', 'sm:items-stretch'),
  justifyContent('sm:justify-center')
)

function Main() {
  const { width } = useWindowDimensions()
  const mobile = width < 640

  return (
    <>
      {/* <div className={proofingCardContainer}>
        <ProofingCard />
        <BadgingCard />
        <ZkProofButton />
      </div> */}
      <div className={mainBlock}>
        <ProofsCard />
        <CardSeparator number={3} from="yellow" to="pink" />
        <Card shadow color="pink">
          <Badges />
        </Card>
      </div>
      {mobile && <ZkProofButton />}
    </>
  )
}

export default Main
