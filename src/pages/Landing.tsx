import { AccentText, HighlightedText } from 'components/Text'
import DownArrows from 'components/DownArrows'
import IdentityCardOne from 'components/IdentityCardOne'
import IdentityCardTwo from 'components/IdentityCardTwo'
import LandingBuildingIdentitiesCard from 'components/LandingBuildingIdentitiesCard'
import LandingCreatingZKProofCard from 'components/LandingCreatingZKProofCard'
import LandingInitialCard from 'components/LandingInitialCard'
import LandingLearnMoreCard from 'components/LandingLearnMoreCard'
import OrbInBox, { OrbsColors } from 'icons/OrbInBox'
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
  space('lg:space-x-6', 'space-x-4'),
  margin('mb-6')
)
const highlightedBlock = classnames(width('lg:w-fit', 'w-3/4'))
const orbBoxes = classnames(display('flex'), flexDirection('flex-row'))
const orbBox = classnames(display('flex'), flexDirection('flex-col'))

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
      <div className={highlightedBlock}>
        <HighlightedText center>
          It starts with connecting your wallets with NFTs
        </HighlightedText>
      </div>
      <div className={orbBoxes}>
        <div className={orbBox}>
          <OrbInBox color={OrbsColors.green} />
          <HighlightedText>Wallet 01</HighlightedText>
        </div>
        <div className={orbBox}>
          <OrbInBox color={OrbsColors.yellow} />
          <HighlightedText>Wallet 02</HighlightedText>
        </div>
        <div className={orbBox}>
          <OrbInBox color={OrbsColors.pink} />
          <HighlightedText>Wallet 03</HighlightedText>
        </div>
      </div>
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
