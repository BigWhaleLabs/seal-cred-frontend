import {
  CategoriesComponentProps,
  CategoriesTitles,
  categories,
} from 'models/Categories'
import { displayTo } from 'helpers/visibilityClassnames'
import Dropdown from 'components/Dropdown'
import classnames, { width } from 'classnames/tailwind'

export default function ({
  currentCategory,
  setCategory,
}: CategoriesComponentProps) {
  const options = Object.entries(categories).map(([label, { disabled }]) => ({
    label,
    disabled,
  }))

  return (
    <div className={classnames(displayTo('md'), width('w-full'))}>
      <Dropdown
        currentValue={currentCategory.toString()}
        options={options}
        onChange={(selectedValue) => {
          setCategory(selectedValue as CategoriesTitles)
        }}
        colorfulCurrentValue
      />
    </div>
  )
}
