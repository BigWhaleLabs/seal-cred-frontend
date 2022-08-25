import { createRef } from 'preact'
import { useState } from 'preact/hooks'
import Arrow from 'icons/Arrow'
import Menu from 'components/Dropdown/Menu'
import Option from 'components/Dropdown/Option'
import classnames, {
  alignItems,
  display,
  gap,
  justifyContent,
  opacity,
  position,
  textColor,
  width,
} from 'classnames/tailwind'
import useClickOutside from 'hooks/useClickOutside'

const button = classnames(
  display('flex'),
  justifyContent('justify-between'),
  alignItems('items-center'),
  width('w-full'),
  gap('gap-x-2'),
  opacity('disabled:opacity-30')
)

const container = classnames(position('relative'), width('md:w-fit'))

export default function <T>({
  disabled,
  currentValue,
  placeholder,
  options,
  onChange,
}: {
  disabled?: boolean
  currentValue?: T
  placeholder?: string
  options: Option<T>[]
  onChange: (selectedValue: T) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = createRef<HTMLDivElement>()

  useClickOutside(ref, () => setOpen(false))

  const selectedOption = options.find((o) => o.value === currentValue)

  const selectedElement = (
    <button
      onClick={() => options.length && setOpen(!open)}
      className={button}
      disabled={disabled}
    >
      {selectedOption?.label || placeholder}
      <div className={width('w-5')}>
        <Arrow pulseDisabled open={open} />
      </div>
    </button>
  )

  return (
    <div className={container} ref={ref}>
      <span className={textColor('text-primary')}>{selectedElement}</span>
      <Menu
        open={open}
        options={options}
        selected={selectedOption}
        onSelect={(option) => {
          onChange(option.value)
          setOpen(false)
        }}
      />
    </div>
  )
}
