import { ButtonColor } from 'components/Button'
import { Popover } from '@headlessui/react'
import {
  alignItems,
  backgroundColor,
  borderRadius,
  boxShadow,
  classnames,
  cursor,
  display,
  flexDirection,
  fontWeight,
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

const button = (color: ButtonColor, loading?: boolean, badge?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    space('space-x-2'),
    transitionProperty('transition-colors'),
    alignItems('items-center'),
    fontWeight(badge ? undefined : 'font-bold'),
    textColor('text-white'),
    padding(badge ? undefined : 'py-4', badge ? 'px-2' : 'px-6'),
    borderRadius('rounded-full'),
    outlineStyle('focus:outline-none'),
    buttonColor(color),
    cursor(loading ? 'cursor-not-allowed' : undefined),
    opacity(loading ? 'opacity-75' : undefined)
  )

const panelContentContainer = classnames(
  overflow('overflow-hidden'),
  borderRadius('rounded-lg'),
  boxShadow('shadow-lg'),
  ringWidth('ring-1'),
  ringColor('ring-black'),
  ringOpacity('ring-opacity-5'),
  translate('translate-x-1/2'),
  inset('right-1/2')
)

const panelContainer = classnames(
  panelContentContainer,
  position('absolute'),
  zIndex('z-10'),
  width('w-auto'),
  maxWidth('max-w-sm'),
  maxWidth('lg:max-w-3xl'),
  padding('px-4', 'sm:px-0'),
  margin('mt-3')
)

const popoverConteiner = classnames(position('relative'))

export default function AddressPanel() {
  return (
    <Popover className={popoverConteiner}>
      <Popover.Button className={button('accent', false, false)}>
        <OptionsIcon />
      </Popover.Button>
      <Popover.Panel className={panelContainer}>
        <ConnectedPublicAccountList />
        <ConnectPublicAccount />
      </Popover.Panel>
    </Popover>
  )
}
