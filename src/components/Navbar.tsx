import { Link } from 'react-router-dom'
import { LogoText } from 'components/Text'
import { useEffect, useState } from 'react'
import Logo from 'icons/Logo'
import Wallet from 'components/Wallet'
import classnames, {
  alignItems,
  backgroundColor,
  display,
  inset,
  justifyContent,
  margin,
  maxWidth,
  padding,
  position,
  space,
  zIndex,
} from 'classnames/tailwind'

const navbar = (visible?: boolean) =>
  classnames(
    position('sticky'),
    inset('top-0'),
    display('flex'),
    alignItems('items-center'),
    justifyContent('justify-between'),
    padding('py-4', 'px-4'),
    margin('mb-2'),
    space('space-x-9', 'md:space-x-0'),
    zIndex('z-10'),
    backgroundColor(visible ? 'bg-blue-900' : 'bg-transparent')
  )

const logoContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('space-x-2'),
  margin('mt-2')
)

export default function Navbar() {
  const [backgroundVisible, setBackgroundVisible] = useState(false)
  const onScroll = () => {
    setBackgroundVisible(document.documentElement.scrollTop > 20)
  }
  useEffect(() => {
    document.addEventListener('scroll', onScroll)
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={navbar(backgroundVisible)}>
      <Link to="/">
        <div className={logoContainer}>
          <Logo />
          <LogoText>SealCred</LogoText>
        </div>
      </Link>
      <Wallet />
    </nav>
  )
}
