import { JSX, createRef } from 'preact'
import { displayTo } from 'helpers/visibilityClassnames'
import { useState } from 'preact/hooks'
import Arrow from 'icons/Arrow'
import Menu from 'components/Dropdown/Menu'
import Option from 'components/Dropdown/Option'
import classnames, {
  alignItems,
  backgroundClip,
  backgroundImage,
  display,
  fontSize,
  fontWeight,
  gap,
  gradientColorStops,
  justifyContent,
  margin,
  opacity,
  position,
  textColor,
} from 'classnames/tailwind'
import useClickOutside from 'hooks/useClickOutside'

const gradientText = classnames(
  textColor('text-transparent'),
  backgroundImage('bg-gradient-to-r'),
  backgroundClip('bg-clip-text'),
  gradientColorStops('from-secondary', 'to-accent'),
  fontWeight('font-bold')
)
const textStyles = (colorfulCurrentValue?: boolean) =>
  classnames(
    fontSize('text-sm'),
    colorfulCurrentValue ? gradientText : undefined
  )
const button = classnames(
  display('flex'),
  justifyContent('justify-start'),
  alignItems('items-center'),
  gap('gap-x-2'),
  opacity('disabled:opacity-30')
)
const container = (displayBeforeMd?: boolean) =>
  classnames(
    position('relative'),
    margin('my-2'),
    displayBeforeMd ? displayTo('md') : undefined
  )

export default function ({
  colorfulCurrentValue,
  currentValue,
  disabled,
  displayBeforeMd,
  fitToItemSize,
  onChange,
  options,
  staticPlaceholder,
}: {
  currentValue: string
  options: Option[]
  onChange: (selectedValue: string) => void
  displayBeforeMd?: boolean
  disabled?: boolean
  staticPlaceholder?: string | JSX.Element
  fitToItemSize?: boolean
  colorfulCurrentValue?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = createRef<HTMLDivElement>()

  useClickOutside(ref, () => setOpen(false))

  const selectedElement = (
    <button
      className={button}
      disabled={disabled}
      onClick={() => options.length && setOpen(!open)}
    >
      <span className={textStyles(colorfulCurrentValue)}>
        {staticPlaceholder || currentValue}
      </span>
      <Arrow pulseDisabled open={open} />
    </button>
  )

  return (
    <div className={container(displayBeforeMd)} ref={ref}>
      {selectedElement}
      <Menu
        fitToItemSize={fitToItemSize}
        open={open}
        options={options}
        selected={currentValue}
        onSelect={({ label, value }) => {
          onChange(value || label)
          setOpen(false)
        }}
      />
    </div>
  )
}
