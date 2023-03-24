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
    disabled,
    label,
  }))

  return (
    <Dropdown
      colorfulCurrentValue
      displayBeforeMd
      currentValue={currentCategory.toString()}
      options={options}
      onChange={(selectedValue) => {
        setCategory(selectedValue as CategoriesTitles)
      }}
    />
  )
}
