import {
  CategoriesComponentProps,
  CategoriesTitles,
  categories,
} from 'models/Categories'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  gap,
  height,
  inset,
  justifyContent,
  opacity,
  padding,
  position,
  stroke,
  transitionProperty,
  width,
} from 'classnames/tailwind'

const desktopMenuWrapper = classnames(
  display('md:flex', 'hidden'),
  flexDirection('flex-col'),
  position('sticky'),
  inset('top-4'),
  backgroundColor('bg-primary-background'),
  height('h-fit'),
  width('w-fit'),
  padding('p-2'),
  gap('gap-y-1'),
  borderRadius('rounded-full')
)
const iconWrapper = (active: boolean) =>
  classnames(
    display('flex'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    borderRadius('rounded-full'),
    backgroundColor({ 'bg-accent': active }, 'hover:bg-primary-dimmed'),
    stroke(
      active ? 'stroke-primary-background' : 'stroke-formal-accent',
      'hover:stroke-formal-accent'
    ),
    transitionProperty('transition-all'),
    opacity('disabled:opacity-30'),
    width('w-9'),
    height('h-9')
  )

export default function ({
  currentCategory,
  setCategory,
}: CategoriesComponentProps) {
  return (
    <div className={desktopMenuWrapper}>
      {Object.entries(categories).map(([title, { icon, disabled }]) => (
        <button
          title={title}
          className={iconWrapper(currentCategory === title)}
          onClick={() => setCategory(title as CategoriesTitles)}
          disabled={disabled}
        >
          {icon}
        </button>
      ))}
    </div>
  )
}
