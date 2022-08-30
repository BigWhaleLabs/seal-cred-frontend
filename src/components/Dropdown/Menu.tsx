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

const container = (closed: boolean) =>
  classnames(
    position('absolute'),
    inset('top-7', '-left-2.5'),
    opacity({ 'opacity-0': closed }),
    visibility({ invisible: closed }),
    zIndex('z-40'),
    transitionProperty('transition-all'),
    width('w-full-105')
  )
const menuItem = (selected?: boolean) =>
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
    transitionProperty('transition-colors')
  )

export default function <T>({
  open,
  options,
  selected,
  onSelect,
}: {
  open: boolean
  options: Option<T>[]
  selected?: Option<T>
  onSelect: (option: Option<T>) => void
}) {
  return (
    <div className={container(!open)}>
      <ItemContainer>
        {options.map((option) => (
          <button
            key={option.value}
            className={menuItem(option.value === selected?.value)}
            onClick={() => {
              onSelect(option)
            }}
            disabled={option.disabled}
          >
            {option.label}
          </button>
        ))}
      </ItemContainer>
    </div>
  )
}
