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
  textColor,
  transitionProperty,
  visibility,
  width,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'

const container = (closed: boolean) =>
  classnames(
    position('absolute'),
    inset('top-7'),
    opacity({ 'opacity-0': closed }),
    visibility({ invisible: closed }),
    zIndex('z-40'),
    transitionProperty('transition-all'),
    width('w-full')
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
      <ItemContainer withPadding>
        {options.map((option) => (
          <p
            key={option.value}
            className={menuItem(option.value === selected?.value)}
            onClick={() => {
              onSelect(option)
            }}
          >
            {option.label}
          </p>
        ))}
        <p className={menuItem(false)} disabled>
          <span className={opacity('opacity-30')}>Assets</span>{' '}
          <span className={textColor('text-primary')}>(coming soon)</span>
        </p>
      </ItemContainer>
    </div>
  )
}
