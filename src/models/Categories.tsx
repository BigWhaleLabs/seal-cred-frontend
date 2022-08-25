import { classnames, height, width } from 'classnames/tailwind'
import Email from 'icons/Email'
import Nft from 'icons/Nft'

const emailIconSizes = classnames(width('w-4'), height('h-3'))

export interface CategoriesComponentProps {
  currentCategory: CategoriesTitles
  setCategory: (category: CategoriesTitles) => void
}

export const categories = {
  ['NFTs']: {
    icon: <Nft inheritStrokeColor />,
  },
  ['Email']: {
    icon: (
      <div className={emailIconSizes}>
        <Email customSize inheritStrokeColor />
      </div>
    ),
  },
}

export type CategoriesTitles = keyof typeof categories
