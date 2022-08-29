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
      options={Object.entries(categories).map(([title, { disabled }]) => ({
        label: title,
        value: title,
        disabled,
      }))}
      onChange={(selectedValue) => {
        setCategory(selectedValue as CategoriesTitles)
      }}
    />
  )
}
