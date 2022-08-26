import {
  CategoriesComponentProps,
  CategoriesTitles,
  categories,
} from 'models/Categories'
import Dropdown from 'components/Dropdown'

export default function ({
  currentCategory,
  setCategory,
}: CategoriesComponentProps) {
  return (
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
  )
}
