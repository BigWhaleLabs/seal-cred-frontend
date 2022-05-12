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
import SuperOrb from 'icons/SuperOrb'
import classnames, {
  alignItems,
  display,
  flexDirection,
  margin,
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
const highlightedBlock = classnames(width('lg:w-fit', 'w-3/4'))

function Landing() {
  return (
    <div className={pageBox}>
      <LandingInitialCard />
      <ScrollDownButton />
      <div className={highlightedBlock}>
        <HighlightedText center>
          It starts with connecting your wallets with NFTs
        </HighlightedText>
      </div>
      <OrbsInBoxes />
      <LandingCreatingZKProofCard />
      <SuperOrb />
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
