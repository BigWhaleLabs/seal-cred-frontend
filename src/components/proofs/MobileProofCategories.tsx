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
  const options = Object.entries(categories).map(([label, { disabled }]) => ({
    label,
    disabled,
  }))

  return (
    <Dropdown
      currentValue={currentCategory.toString()}
      options={options}
      onChange={(selectedValue) => {
        setCategory(selectedValue as CategoriesTitles)
      }}
    />
  )
}
