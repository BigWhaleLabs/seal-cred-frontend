import { HighlightedText } from 'components/Text'
import IdentityCardOne from 'components/IdentityCardOne'
import IdentityCardTwo from 'components/IdentityCardTwo'
import LandingBuildingIdentitiesCard from 'components/LandingBuildingIdentitiesCard'
import LandingCreatingZKProofCard from 'components/LandingCreatingZKProofCard'
import LandingInitialCard from 'components/LandingInitialCard'
import LandingLearnMoreCard from 'components/LandingLearnMoreCard'
import OrbsInBoxes from 'components/OrbsInBoxes'
import ScrollDownButton from 'components/ScrollDownButton'
import SuperHr from 'components/SuperHr'
import SuperOrbWithConnectors from 'icons/SuperOrbWithConnectors'
import TopConnectors from 'icons/TopConnectors'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  margin,
  position,
  space,
  width,
} from 'classnames/tailwind'

const pageBox = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
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
  return (
    <div className={pageBox}>
      <LandingInitialCard />
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
        className={position('absolute')}
        style={{ transform: 'translateY(1100px)' }}
      >
        <LandingCreatingZKProofCard />
      </div>
      <SuperOrbWithConnectors />
      <div className={identityCards}>
        <IdentityCardOne />
        <IdentityCardTwo />
      </div>
      <LandingBuildingIdentitiesCard />
      <SuperHr />
      <LandingLearnMoreCard />
    </div>
  )
}

export default Landing
