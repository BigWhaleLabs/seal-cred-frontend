import ItemContainer from 'components/Dropdown/ItemContainer'
import Option from 'components/Dropdown/Option'
import classnames, {
  backgroundColor,
  borderRadius,
  cursor,
  inset,
  minWidth,
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
        ? { 'right-0': true, 'xs:right-auto': true, 'xs:left-0': true }
        : '-left-2.5'
    ),
    opacity({ 'opacity-0': closed }),
    visibility({ invisible: closed }),
    zIndex('z-40'),
    transitionProperty('transition-all'),
    width({ 'w-full-105': !fitToItemSize })
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
    width({ 'w-full': fitToItemSize }),
    minWidth({ 'min-w-max': fitToItemSize })
  )

export default function ({
  open,
  options,
  selected,
  onSelect,
  fitToItemSize,
}: {
  open: boolean
  options: Option[]
  fitToItemSize?: boolean
  selected?: string
  onSelect?: (option: Option) => void
}) {
  return (
    <div className={container(!open, fitToItemSize)}>
      <ItemContainer>
        {options.map((option) => (
          <button
            key={option.label}
            className={menuItem(
              option.forceSelected || option.label === selected,
              fitToItemSize
            )}
            onClick={() => {
              if (onSelect) onSelect(option)
            }}
            disabled={option.disabled}
          >
            <a href={option.href}>{option.label}</a>
          </button>
        ))}
      </ItemContainer>
    </div>
  )
}
