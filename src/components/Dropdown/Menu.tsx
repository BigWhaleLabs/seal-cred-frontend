import ItemContainer from 'components/Dropdown/ItemContainer'
import Option from 'components/Dropdown/Option'
import classnames, {
  backgroundColor,
  borderRadius,
  cursor,
  inset,
  opacity,
  padding,
  position,
  textAlign,
  transitionProperty,
  visibility,
  width,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'

const container = (closed: boolean, fitToItemSize?: boolean) =>
  classnames(
    position('absolute'),
    inset(
      'top-7',
      fitToItemSize
        ? { 'right-0': true, 'xs:left-0': true, 'xs:right-auto': true }
        : '-left-2.5'
    ),
    opacity({ 'opacity-0': closed }),
    visibility({ invisible: closed }),
    zIndex('z-40'),
    transitionProperty('transition-all'),
    width(fitToItemSize ? 'w-max' : 'w-full-105')
  )
const menuItem = (selected?: boolean, fitToItemSize?: boolean) =>
  classnames(
    padding('p-2'),
    cursor('cursor-pointer'),
    borderRadius('rounded-md'),
    wordBreak('break-all'),
    backgroundColor('hover:bg-primary-background', {
      'bg-primary-dimmed': selected,
    }),
    width('w-full'),
    textAlign('text-left'),
    opacity('disabled:opacity-30'),
    transitionProperty('transition-colors'),
    width({ 'w-full': fitToItemSize })
  )

export default function ({
  fitToItemSize,
  onSelect,
  open,
  options,
  selected,
}: {
  open: boolean
  options: Option[]
  onSelect: (option: Option) => void
  fitToItemSize?: boolean
  selected?: string
}) {
  return (
    <div className={container(!open, fitToItemSize)}>
      <ItemContainer>
        {options.map((option) => (
          <button
            disabled={option.disabled}
            key={option.label}
            className={menuItem(
              option.value === selected || option.label === selected,
              fitToItemSize
            )}
            onClick={() => {
              onSelect(option)
            }}
          >
            {option.label}
          </button>
        ))}
      </ItemContainer>
    </div>
  )
}
