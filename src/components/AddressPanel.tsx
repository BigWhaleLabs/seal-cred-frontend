import { ButtonColor } from 'components/Button'
import { Popover } from '@headlessui/react'
import {
  alignItems,
  backgroundColor,
  borderRadius,
  boxShadow,
  classnames,
  display,
  flexDirection,
  fontWeight,
  height,
  inset,
  margin,
  maxWidth,
  opacity,
  outlineStyle,
  overflow,
  padding,
  position,
  ringColor,
  ringOpacity,
  ringWidth,
  space,
  textColor,
  transitionProperty,
  translate,
  width,
  zIndex,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import ConnectPublicAccount from 'components/ConnectPublicAccount'
import ConnectedPublicAccountList from 'components/ConnectedPublicAccountList'
import OptionsIcon from 'components/OptionsIcon'
import PublicAccountStore from 'stores/PublicAccountStore'
import useBreakpoints from 'helpers/useBreakpoints'

const buttonColor = (color: ButtonColor) => {
  const { theme } = useSnapshot(AppStore)
  return classnames(
    color === 'accent'
      ? backgroundColor('bg-accent', 'hover:bg-accent-dimmed')
      : color === 'primary'
      ? backgroundColor('bg-primary', 'hover:bg-secondary')
      : color === 'success'
      ? classnames(backgroundColor('bg-success'), opacity('hover:opacity-90'))
      : backgroundColor('bg-error', 'hover:bg-error-light'),
    textColor(
      color === 'primary' && theme === 'dark' ? 'text-semi-background' : null
    )
  )
}

const button = (color: ButtonColor) =>
  classnames(
    height('h-full'),
    display('flex'),
    flexDirection('flex-row'),
    space('space-x-2'),
    transitionProperty('transition-colors'),
    alignItems('items-center'),
    fontWeight('font-bold'),
    textColor('text-white'),
    padding('py-4', 'px-6'),
    borderRadius('rounded'),
    outlineStyle('focus:outline-none'),
    buttonColor(color)
  )

const panelContentContainer = classnames(
  overflow('overflow-hidden'),
  borderRadius('rounded-lg'),
  boxShadow('shadow-lg'),
  ringWidth('ring-1'),
  ringColor('ring-black'),
  ringOpacity('ring-opacity-5'),
  translate('translate-x-1/2'),
  inset('top-2', 'md:top-auto', 'right-1/2')
)

const panelContainer = classnames(
  panelContentContainer,
  position('fixed', 'md:absolute'),
  zIndex('z-10'),
  width('w-full', 'md:w-fit'),
  maxWidth('max-w-sm', 'lg:max-w-3xl'),
  margin('mt-3')
)

const popoverConteiner = classnames(
  position('relative'),
  margin('!mt-0', 'mx-1')
)

export default function AddressPanel() {
  const { md } = useBreakpoints()

  return (
    <Popover className={popoverConteiner}>
      <Popover.Button className={button('accent')}>
        {md || PublicAccountStore.privateKey ? (
          <OptionsIcon />
        ) : (
          'Select another address'
        )}
      </Popover.Button>
      <Popover.Panel className={panelContainer}>
        <ConnectedPublicAccountList />
        <ConnectPublicAccount />
      </Popover.Panel>
    </Popover>
  )
}
