import { Link } from 'react-router-dom'
import { LogoSubText, LogoText } from 'components/Text'
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
  zIndex,
} from 'classnames/tailwind'
import useThrottle from 'hooks/useThrottle'

const navbar = (visible?: boolean, withoutWallet?: boolean) =>
  classnames(
    position('sticky'),
    inset('top-0'),
    display('flex'),
    alignItems('items-center'),
    justifyContent(withoutWallet ? 'sm:justify-center' : 'justify-between'),
    padding('py-4', 'px-4', 'lg:px-25'),
    space('space-x-9', 'lg:space-x-0'),
    zIndex('z-50'),
    backgroundColor(visible ? 'bg-primary-dark' : 'bg-transparent'),
    transitionProperty('transition-all')
  )

const logoContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('space-x-4'),
  margin('mt-2')
)

const logoWithVersion = classnames(display('flex'), flexDirection('flex-col'))

export default function () {
  const { pathname } = useLocation()
  const withoutWallet = pathname.split('/').length >= 3

  const [backgroundVisible, setBackgroundVisible] = useState(false)
  const onScroll = useCallback(() => {
    setBackgroundVisible(window.scrollY > 20)
  }, [])
  const throttledScroll = useThrottle(onScroll, 20)
  useMemo(() => {
    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [throttledScroll])

  return (
    <nav className={navbar(backgroundVisible, withoutWallet)}>
      <Link to="/">
        <div className={logoContainer}>
          <Logo />
          <div className={logoWithVersion}>
            <LogoText>SealCred</LogoText>
            <LogoSubText>(ALPHA)</LogoSubText>
          </div>
        </div>
      </Link>
      {!withoutWallet && <Wallet />}
    </nav>
  )
}
