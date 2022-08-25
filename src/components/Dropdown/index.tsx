import { createRef } from 'preact'
import { useState } from 'preact/hooks'
import Arrow from 'icons/Arrow'
import ItemContainer from 'components/Dropdown/ItemContainer'
import Menu from 'components/Dropdown/Menu'
import Option from 'components/Dropdown/Option'
import classnames, {
  alignItems,
  display,
  gap,
  justifyContent,
  opacity,
  padding,
  position,
  textColor,
  width,
} from 'classnames/tailwind'
import useClickOutside from 'hooks/useClickOutside'

const button = (forZkBadges?: boolean) =>
  classnames(
    display('flex'),
    justifyContent('justify-between'),
    alignItems('items-center'),
    width('w-full'),
    gap('gap-x-2'),
    padding({ 'p-3': forZkBadges }),
    opacity('disabled:opacity-30')
  )

const container = (forZkBadges?: boolean) =>
  classnames(position('relative'), width('md:w-fit', { 'w-full': forZkBadges }))

export default function <T>({
  disabled,
  currentValue,
  placeholder,
  options,
  onChange,
  forZkBadges,
}: {
  disabled?: boolean
  currentValue?: T
  placeholder?: string
  options: Option<T>[]
  onChange: (selectedValue: T) => void
  forZkBadges?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = createRef<HTMLDivElement>()

  useClickOutside(ref, () => setOpen(false))

  const selectedOption = options.find((o) => o.value === currentValue)

  const selectedElement = (
    <button
      onClick={() => options.length && setOpen(!open)}
      className={button(forZkBadges)}
      disabled={disabled}
    >
      {selectedOption?.label || placeholder}
      <div className={width('w-5')}>
        <Arrow pulseDisabled open={open} />
      </div>
    </button>
  )

  return (
    <div className={container(forZkBadges)} ref={ref}>
      {forZkBadges ? (
        <ItemContainer forZkBadges>{selectedElement}</ItemContainer>
      ) : (
        <span className={textColor('text-primary')}>{selectedElement}</span>
      )}
      <Menu
        open={open}
        options={options}
        selected={selectedOption}
        onSelect={(option) => {
          onChange(option.value)
          setOpen(false)
        }}
        forZkBadges={forZkBadges}
      />
    </div>
  )
}
