import { HighlightedText } from 'components/Text'
import BuildingIdentitiesCard from 'components/landing/BuildingIdentitiesCard'
import CreatingZKProofCard from 'components/landing/CreatingZKProofCard'
import IdentityCard from 'components/landing/IdentityCard'
import InitialCard from 'components/landing/InitialCard'
import LearnMoreCard from 'components/landing/LearnMoreCard'
import OrbsInBoxes from 'components/landing/OrbsInBoxes'
import ScrollDownButton from 'components/landing/ScrollDownButton'
import SuperHr from 'icons/SuperHr'
import SuperOrbWithConnectors from 'icons/SuperOrbWithConnectors'
import TopConnectors from 'icons/TopConnectors'
import ZkSphere from 'components/landing/ZkSphere'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  justifyContent,
  margin,
  padding,
  position,
  space,
  width,
  zIndex,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'
import useScrollPercent from 'hooks/useScrollPercent'

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
const highlightedWrapper = classnames(
  padding('px-4', 'py-1'),
  borderRadius('rounded-full'),
  backgroundColor('bg-formal-accent')
)

export default function () {
  const scroll = useScrollPercent()
  const { xs } = useBreakpoints()
  const animEnd = scroll > 0.645

  return (
    <div className={pageBox}>
      <InitialCard showSpinner={!xs} />
      <ScrollDownButton mobile={xs} />
      <div
        className={position('absolute')}
        style={{ transform: `translateY(${xs ? '36.5' : '35.5'}rem)` }}
      >
        <TopConnectors />
      </div>
      <div
        className={highlightedBlock}
        style={{ transform: 'translateY(40rem)' }}
      >
        <div className={highlightedWrapper}>
          <HighlightedText center>
            It starts with connecting your wallets with NFTs
          </HighlightedText>
        </div>
      </div>
      <OrbsInBoxes />
      <div
        className={classnames(position('absolute'), zIndex('z-40'))}
        style={{ transform: `translateY(${xs ? '63.625' : '65.625'}rem)` }}
      >
        <CreatingZKProofCard />
      </div>
      <SuperOrbWithConnectors />
      <div className={identityCards}>
        <IdentityCard left text="Identity-01" mobile={xs} reveal={animEnd}>
          <ZkSphere text="ZK" color="tertiary" />
          <ZkSphere text="ZK" color="accent" />
        </IdentityCard>
        <IdentityCard text="Identity-02" mobile={xs} reveal={animEnd}>
          <ZkSphere text="ZK" color="secondary" />
        </IdentityCard>
      </div>
      <BuildingIdentitiesCard />
      <SuperHr />
      <LearnMoreCard />
    </div>
  )
}
