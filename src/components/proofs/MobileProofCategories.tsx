import {
  CategoriesComponentProps,
  CategoriesTitles,
  categories,
} from 'models/Categories'
import { display } from 'classnames/tailwind'
import Dropdown from 'components/Dropdown'

const mobileMenuWrapper = display('md:hidden', 'block')

export default function ({
  currentCategory,
  setCategory,
}: CategoriesComponentProps) {
  return (
    <div className={mobileMenuWrapper}>
      <Dropdown
        currentValue={currentCategory}
        placeholder="Select a category"
        options={Object.keys(categories).map((title) => ({
          label: title,
          value: title,
        }))}
        onChange={(selectedValue) => {
          setCategory(selectedValue as CategoriesTitles)
        }}
      />
    </div>
  )
}
