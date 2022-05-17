import { HighlightedText } from 'components/Text'
import Colors from 'models/Colors'
import IdentityCard from 'components/IdentityCardOne'
import LandingBuildingIdentitiesCard from 'components/LandingBuildingIdentitiesCard'
import LandingCreatingZKProofCard from 'components/LandingCreatingZKProofCard'
import LandingInitialCard from 'components/LandingInitialCard'
import LandingLearnMoreCard from 'components/LandingLearnMoreCard'
import OrbsInBoxes from 'components/OrbsInBoxes'
import ScrollDownButton from 'components/ScrollDownButton'
import SuperHr from 'components/SuperHr'
import SuperOrbWithConnectors from 'icons/SuperOrbWithConnectors'
import TopConnectors from 'icons/TopConnectors'
import ZkSphere from 'components/ZkSphere'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  margin,
  position,
  space,
  width,
  zIndex,
} from 'classnames/tailwind'
import useBreakpoints from 'helpers/useBreakpoints'
import useScrollPercent from 'helpers/useScrollPercent'

const pageBox = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  margin('mt-5', 'sm:mt-10')
)
const identityCards = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  space('lg:space-x-6', 'space-x-4'),
  margin('mb-6')
)
const highlightedBlock = classnames(
  display('flex'),
  flexDirection('flex-row'),
  justifyContent('justify-center'),
  width('lg:w-fit', 'w-5/6'),
  position('absolute')
)

function Landing() {
  const scroll = useScrollPercent()
  const { mobile } = useBreakpoints()
  const animEnd = scroll > 0.645

  return (
    <div className={pageBox}>
      <LandingInitialCard showSpinner={!mobile} />
      <ScrollDownButton />
      <div
        className={position('absolute')}
        style={{ transform: 'translateY(610px)' }}
      >
        <TopConnectors />
      </div>
      <div
        className={highlightedBlock}
        style={{ transform: 'translateY(690px)' }}
      >
        <HighlightedText center bold>
          It starts with connecting your wallets with NFTs
        </HighlightedText>
      </div>
      <OrbsInBoxes />
      <div
        className={classnames(position('absolute'), zIndex('z-40'))}
        style={{ transform: 'translateY(1050px)' }}
      >
        <LandingCreatingZKProofCard />
      </div>
      <SuperOrbWithConnectors />
      <div className={identityCards}>
        <IdentityCard left text="Identity-01" mobile={mobile} reveal={animEnd}>
          <ZkSphere text="ZK" color={Colors.tertiary} />
          <ZkSphere text="ZK" color={Colors.accent} />
        </IdentityCard>
        <IdentityCard text="Identity-02" mobile={mobile} reveal={animEnd}>
          <ZkSphere text="ZK" color={Colors.secondary} />
        </IdentityCard>
      </div>
      <LandingBuildingIdentitiesCard />
      <SuperHr />
      <LandingLearnMoreCard />
    </div>
  )
}

export default Landing
