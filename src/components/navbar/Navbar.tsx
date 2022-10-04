import { useLocation } from 'react-router-dom'
import NavLogo from 'components/navbar/NavLogo'
import RightBlock from 'components/navbar/RightBlock'
import classnames, {
  alignItems,
  backgroundColor,
  display,
  inset,
  justifyContent,
  padding,
  position,
  space,
  transitionProperty,
  zIndex,
} from 'classnames/tailwind'
import useScrolledFromTop from 'hooks/useScrolledFromTop'

const navbar = (visible?: boolean, withoutRightBlock?: boolean) =>
  classnames(
    position('sticky'),
    inset('top-0'),
    display('flex'),
    alignItems('items-center'),
    justifyContent(withoutRightBlock ? 'sm:justify-center' : 'justify-between'),
    padding('p-4', 'lg:px-25'),
    space('space-x-2', 'lg:space-x-0'),
    zIndex('z-50'),
    backgroundColor(visible ? 'bg-primary-dark' : 'bg-transparent'),
    transitionProperty('transition-all')
  )

export default function () {
  const { pathname } = useLocation()
  const backgroundVisible = useScrolledFromTop()
  const withoutRightBlock = pathname.split('/').length >= 3

  return (
    <nav className={navbar(backgroundVisible, withoutRightBlock)}>
      <NavLogo />
      {!withoutRightBlock && <RightBlock />}
    </nav>
  )
}
