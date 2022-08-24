import { Link } from 'react-router-dom'
import { LogoSubText, LogoText } from 'components/ui/Text'
import { useCallback, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from 'icons/Logo'
import Wallet from 'components/navbar/Wallet'
import classnames, {
  alignItems,
  backgroundColor,
  display,
  flexDirection,
  inset,
  justifyContent,
  margin,
  padding,
  position,
  space,
  transitionProperty,
  width,
  zIndex,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const navbar = (visible?: boolean, withoutWallet?: boolean) =>
  classnames(
    position('sticky'),
    inset('top-0'),
    display('flex'),
    alignItems('items-center'),
    justifyContent(withoutWallet ? 'sm:justify-center' : 'justify-between'),
    padding('py-4', 'px-4', 'lg:px-25'),
    space('tiny:space-x-4', 'sm:space-x-9', 'lg:space-x-0'),
    zIndex('z-50'),
    backgroundColor(visible ? 'bg-primary-dark' : 'bg-transparent'),
    transitionProperty('transition-all')
  )

const logoContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('sm:space-x-4', 'space-x-1'),
  margin('mt-2')
)

const logoWithVersion = classnames(display('flex'), flexDirection('flex-col'))

const logoWrapper = classnames(display('flex'), width('w-1/4', 'sm:w-full'))

export default function () {
  const { pathname } = useLocation()
  const withoutWallet = pathname.split('/').length >= 3

  const { xs } = useBreakpoints()

  const [backgroundVisible, setBackgroundVisible] = useState(false)
  const onScroll = useCallback(() => {
    setBackgroundVisible(window.scrollY > 20)
  }, [])
  useMemo(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <nav className={navbar(backgroundVisible, withoutWallet)}>
      <Link to="/">
        <div className={logoContainer}>
          <div className={logoWrapper}>
            <Logo />
          </div>
          <div className={logoWithVersion}>
            <LogoText small={xs}>SealCred</LogoText>
            <LogoSubText>(ALPHA)</LogoSubText>
          </div>
        </div>
      </Link>
      {!withoutWallet && <Wallet />}
    </nav>
  )
}
