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
  height,
  inset,
  justifyContent,
  padding,
  position,
  stroke,
  transitionProperty,
  width,
} from 'classnames/tailwind'

const desktopMenuWrapper = classnames(
  display('md:block', 'hidden'),
  position('sticky'),
  inset('top-4'),
  backgroundColor('bg-primary-background'),
  height('h-fit'),
  width('w-fit'),
  padding('p-2'),
  borderRadius('rounded-full')
)
const iconWrapper = (active: boolean) =>
  classnames(
    display('flex'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    borderRadius('rounded-full'),
    backgroundColor({ 'bg-accent': active }),
    stroke(active ? 'stroke-primary-background' : 'stroke-formal-accent'),
    transitionProperty('transition-all'),
    width('w-9'),
    height('h-9')
  )

export default function ({
  currentCategory,
  setCategory,
}: CategoriesComponentProps) {
  return (
    <div className={desktopMenuWrapper}>
      {Object.entries(categories).map(([title, { icon }]) => (
        <div
          className={iconWrapper(currentCategory === title)}
          onClick={() => setCategory(title as CategoriesTitles)}
        >
          {icon}
        </div>
      ))}
    </div>
  )
}
