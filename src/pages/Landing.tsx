import { AccentText, HighlightedText } from 'components/Text'
import CardSeparator from 'components/CardSeparator'
import DownArrows from 'components/DownArrows'
import IdentityCardOne from 'components/IdentityCardOne'
import IdentityCardTwo from 'components/IdentityCardTwo'
import LandingBuildingIdentitiesCard from 'components/LandingBuildingIdentitiesCard'
import LandingCreatingZKProofCard from 'components/LandingCreatingZKProofCard'
import LandingInitialCard from 'components/LandingInitialCard'
import LandingLearnMoreCard from 'components/LandingLearnMoreCard'
import SuperHr from 'components/SuperHr'
import classnames, {
  alignItems,
  display,
  flexDirection,
  margin,
  space,
} from 'classnames/tailwind'

const pageBox = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)
const scrollButton = classnames(
  margin('mt-20'),
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)
const identityCards = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  space('space-x-6'),
  margin('mb-6')
)

function Landing() {
  return (
    <div className={pageBox}>
      <LandingInitialCard />
      <button
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo(0, 600)
        }}
        className={scrollButton}
      >
        <AccentText color="text-yellow">How does this work?</AccentText>
        <DownArrows />
      </button>
      <HighlightedText>
        It starts with connecting your wallets with NFTs
      </HighlightedText>
      <LandingCreatingZKProofCard />
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
