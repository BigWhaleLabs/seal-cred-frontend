import { JSX } from 'preact/jsx-runtime'
import { dataKeys } from 'helpers/contracts/dataShapeObject'
import { width } from 'classnames/tailwind'
import Coin from 'icons/Coin'
import ERC721ProofSection from 'components/proofs/ERC721ProofSection'
import Email from 'icons/Email'
import EmailProofSection from 'components/proofs/EmailProofSection'
import FarcasterProofSection from 'components/proofs/FarcasterProofSection'
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
  NFTs: {
    icon: <Nft inheritStrokeColor />,
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
  },
  Email: {
    icon: (
      <div className={width('w-5')}>
        <Email inheritStrokeColor />
      </div>
    ),
    contentToRender: <EmailProofSection dataKey="Email" />,
  },
  Farcaster: {
    icon: (
      <div className={width('w-5')}>
        <Email inheritStrokeColor />
      </div>
    ),
    contentToRender: <FarcasterProofSection dataKey="Farcaster" />,
  },
  'Assets (coming soon)': {
    icon: <Coin inheritStrokeColor />,
    contentToRender: null,
    disabled: true,
  },
}

export type CategoriesTitles = keyof typeof categories
