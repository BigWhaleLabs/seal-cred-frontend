import { LogoText } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import Logo from 'components/Logo'
import ThemeToggle from 'components/ThemeToggle'

const navbar = classnames(
  'sticky',
  'top-0',
  'flex',
  'items-center',
  'justify-between',
  'py-4',
  'my-2',
  'z-50',
  'bg-background',
  'transition-colors'
)

const logoContainer = classnames('inline-flex', 'items-center', 'space-x-2')

export default function Navbar() {
  return (
    <nav className={navbar}>
      <div className={logoContainer}>
        <Logo />
        <LogoText>StreetCred</LogoText>
      </div>

      <ThemeToggle />
    </nav>
  )
}
