import { JSX } from 'preact/jsx-runtime'
import { dataKeys } from 'helpers/contracts/dataShapeObject'
import { width } from 'classnames/tailwind'
import Coin from 'icons/Coin'
import ERC721ProofSection from 'components/proofs/ERC721ProofSection'
import Email from 'icons/Email'
import EmailProofSection from 'components/proofs/EmailProof/EmailProofSection'
import Nft from 'icons/Nft'
import data, { BadgeSourceType } from 'data'

export interface CategoriesComponentProps {
  currentCategory: CategoriesTitles
  setCategory: (category: CategoriesTitles) => void
}

interface Category {
  [title: string]: {
    icon: JSX.Element
    contentToRender: JSX.Element | null
    disabled?: boolean
  }
}

export const categories: Category = {
  'Assets (coming soon)': {
    contentToRender: null,
    disabled: true,
    icon: <Coin inheritStrokeColor />,
  },
  Email: {
    contentToRender: <EmailProofSection dataKey="Email" />,
    icon: (
      <div className={width('w-5')}>
        <Email inheritStrokeColor />
      </div>
    ),
  },
  NFTs: {
    contentToRender: (
      <>
        {dataKeys
          .filter(
            (ledgerName) =>
              data[ledgerName].badgeType === BadgeSourceType.ERC721
          )
          .map((ledgerName) => (
            <ERC721ProofSection dataKey={ledgerName} />
          ))}
      </>
    ),
    icon: <Nft inheritStrokeColor />,
  },
}

export type CategoriesTitles = keyof typeof categories
