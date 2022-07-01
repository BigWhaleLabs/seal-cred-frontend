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
  inset,
  justifyContent,
  margin,
  padding,
  position,
  space,
  width,
  zIndex,
} from 'classnames/tailwind'
import useScrollPercent from 'hooks/useScrollPercent'

const pageBox = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)
const initialCardWrapper = margin('mt-10')
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
  width('lg:w-max', 'w-5/6')
)
const highlightedWrapper = classnames(
  padding('px-4', 'py-1'),
  borderRadius('rounded-full'),
  backgroundColor('bg-formal-accent'),
  zIndex('z-10')
)
const topBlockWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  position('relative'),
  alignItems('items-center')
)
const topConnectorsWrapper = classnames(
  position('absolute'),
  inset('top-1/2'),
  zIndex('z-0')
)
const createZkProofWrapper = classnames(
  position('absolute'),
  zIndex('z-40'),
  inset('tiny:top-1/4', 'top-48'),
  width('w-screen', 'md:w-fit')
)
const middleConnetorsBlock = classnames(
  position('relative'),
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)

export default function () {
  const scroll = useScrollPercent()
  const animEnd = scroll > 0.645

  return (
    <div className={pageBox}>
      <div className={initialCardWrapper}>
        <InitialCard />
      </div>
      <div className={topBlockWrapper}>
        <ScrollDownButton />
        <div className={topConnectorsWrapper}>
          <TopConnectors />
        </div>
        <div className={highlightedBlock}>
          <div className={highlightedWrapper}>
            <HighlightedText center>
              It starts with connecting your wallets with NFTs
            </HighlightedText>
          </div>
        </div>
      </div>

      <OrbsInBoxes />

      <div className={middleConnetorsBlock}>
        <div className={createZkProofWrapper}>
          <CreatingZKProofCard />
        </div>
        <SuperOrbWithConnectors />
      </div>

      <div className={identityCards}>
        <IdentityCard left text="Identity-01" reveal={animEnd}>
          <ZkSphere text="ZK" color="tertiary" />
          <ZkSphere text="ZK" color="accent" />
        </IdentityCard>
        <IdentityCard text="Identity-02" reveal={animEnd}>
          <ZkSphere text="ZK" color="secondary" />
        </IdentityCard>
      </div>
      <BuildingIdentitiesCard />
      <SuperHr />
      <LearnMoreCard />
    </div>
  )
}
