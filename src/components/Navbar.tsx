import { Link } from 'react-router-dom'
import { LogoText } from 'components/Text'
import {
  alignItems,
  backgroundColor,
  classnames,
  display,
  inset,
  justifyContent,
  margin,
  padding,
  position,
  space,
  transitionProperty,
  zIndex,
} from 'classnames/tailwind'
import Logo from 'icons/Logo'
import ThemeToggle from 'components/ThemeToggle'

const navbar = classnames(
  transitionProperty('transition-colors'),
  position('sticky'),
  inset('top-0'),
  display('flex'),
  alignItems('items-center'),
  justifyContent('justify-between'),
  padding('py-4'),
  margin('my-2'),
  zIndex('z-10'),
  backgroundColor('bg-background')
)

const logoContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('space-x-2')
)

export default function Navbar() {
  return (
    <nav className={navbar}>
      <Link to="/">
        <div className={logoContainer}>
          <Logo />
          <LogoText>StreetCred</LogoText>
        </div>
      </Link>

      <ThemeToggle />
    </nav>
  )
}
