import { Link } from 'react-router-dom'
import { LogoSubText, LogoText } from 'components/ui/Text'
import { Player } from '@lottiefiles/react-lottie-player'
import { displayFrom } from 'helpers/visibilityClassnames'
import { useRef } from 'preact/hooks'
import AnimatedLogo from 'icons/AnimatedLogo'
import classnames, {
  alignItems,
  display,
  flexDirection,
  margin,
  maxWidth,
  space,
  width,
} from 'classnames/tailwind'

const logoContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('sm:space-x-4', 'space-x-1'),
  margin('mt-2')
)

const logoWithVersion = classnames(
  display('flex'),
  flexDirection('flex-col'),
  displayFrom('md')
)

const logoWrapper = classnames(
  display('flex'),
  maxWidth('max-w-14'),
  width('w-full')
)

export default function () {
  const lottieRef = useRef<Player>()

  return (
    <Link to="/">
      <div className={logoContainer}>
        <div
          className={logoWrapper}
          onTouchStart={() => lottieRef.current?.play()}
        >
          <Player ref={lottieRef} src={AnimatedLogo} hover />
        </div>
        <div className={logoWithVersion}>
          <LogoText>SealCred</LogoText>
          <LogoSubText>(ALPHA)</LogoSubText>
        </div>
      </div>
    </Link>
  )
}
