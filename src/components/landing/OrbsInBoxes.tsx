import { HighlightedText } from 'components/Text'
import Color from 'models/Color'
import OrbBox from 'icons/OrbBox'
import ZkSphere from 'components/landing/ZkSphere'
import classnames, {
  TMargin,
  alignItems,
  borderRadius,
  display,
  flexDirection,
  margin,
  padding,
  position,
  space,
  transitionProperty,
  zIndex,
} from 'classnames/tailwind'
import colorToTailwindBackground from 'helpers/colors/colorToTailwindBackground'
import useScrollPercent from 'hooks/useScrollPercent'

const orbBoxes = classnames(
  display('flex'),
  flexDirection('flex-row'),
  transitionProperty('transition-all'),
  zIndex('z-30')
)
const orbBox = (margins?: TMargin) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    alignItems('items-center'),
    space('space-y-2'),
    margin(margins)
  )
const highlightedWrapper = (color: Color) =>
  classnames(
    padding('px-2', 'py-1'),
    borderRadius('rounded-full'),
    colorToTailwindBackground(color),
    zIndex('z-10')
  )
const orbBoxClasses = classnames(position('absolute'), padding('pt-2'))

export default function () {
  const scroll = useScrollPercent()
  const animNotStarted = scroll < 0.2

  return (
    <div className={orbBoxes} style={{ transform: 'translateY(5.625rem)' }}>
      <div className={orbBox('mt-8')}>
        <OrbBox color="tertiary" isShadowOpaque={animNotStarted} />
        <div className={orbBoxClasses}>
          <ZkSphere color="tertiary" animated />
        </div>
        <div className={highlightedWrapper('tertiary')}>
          <HighlightedText center>Wallet 01</HighlightedText>
        </div>
      </div>
      <div className={orbBox()}>
        <OrbBox color="accent" isShadowOpaque={animNotStarted} />
        <div className={orbBoxClasses}>
          <ZkSphere color="accent" animated />
        </div>
        <div className={highlightedWrapper('accent')}>
          <HighlightedText center>Wallet 02</HighlightedText>
        </div>
      </div>
      <div className={orbBox('mt-11')}>
        <OrbBox color="secondary" isShadowOpaque={animNotStarted} />
        <div className={orbBoxClasses}>
          <ZkSphere color="secondary" animated />
        </div>
        <div className={highlightedWrapper('secondary')}>
          <HighlightedText center>Wallet 03</HighlightedText>
        </div>
      </div>
    </div>
  )
}
