import Categories from 'models/Categorelies'
import Email from 'icons/Email'
import Nft from 'icons/Nft'
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

const menuWrapper = classnames(
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
const emailIconSizes = classnames(width('w-4'), height('h-3'))

export default function ({
  currentCategory,
  setCategory,
}: {
  currentCategory: Categories
  setCategory: (category: Categories) => void
}) {
  return (
    <div className={menuWrapper}>
      <div
        className={iconWrapper(currentCategory === Categories.NFTs)}
        onClick={() => setCategory(Categories.NFTs)}
      >
        <Nft inheritStrokeColor />
      </div>
      <div
        className={iconWrapper(currentCategory === Categories.Email)}
        onClick={() => setCategory(Categories.Email)}
      >
        <div className={emailIconSizes}>
          <Email customSize inheritStrokeColor />
        </div>
      </div>
    </div>
  )
}
