import { JSX } from 'preact/jsx-runtime'
import Coin from 'icons/Coin'
import ERC721ProofSection from 'components/proofs/ERC721ProofSection'
import Email from 'icons/Email'
import EmailProof from 'components/proofs/EmailProof'
import EmailProofType from 'helpers/EmailProof'
import Network from 'models/Network'
import Nft from 'icons/Nft'
import ProofSection from 'components/ProofSection'
import ReadyEmailProof from 'components/proofs/ReadyEmailProof'

export interface CategoriesComponentProps {
  currentCategory: CategoriesTitles
  setCategory: (category: CategoriesTitles) => void
}

interface Category {
  [title: string]: {
    icon: JSX.Element
    contentToRender: (
      account?: string,
      emailProofsCompleted?: readonly EmailProofType[]
    ) => JSX.Element | null
    disabled?: boolean
  }
}

export const categories: Category = {
  ['NFTs']: {
    icon: <Nft inheritStrokeColor />,
    contentToRender: (account) => {
      if (!account) return null
      return (
        <>
          <ERC721ProofSection account={account} network={Network.Mainnet} />
          <ERC721ProofSection account={account} network={Network.Goerli} />
        </>
      )
    },
  },
  ['Email']: {
    icon: <Email inheritStrokeColor customSize={{ w: 16, h: 16 }} />,
    contentToRender: (_, emailProofsCompleted) => (
      <ProofSection>
        {emailProofsCompleted &&
          Array.from(emailProofsCompleted).map((proof, index) => (
            <ReadyEmailProof proof={proof} key={`${proof.domain}-${index}`} />
          ))}
        <EmailProof />
      </ProofSection>
    ),
  },
  ['Assets (coming soon)']: {
    icon: <Coin inheritStrokeColor />,
    contentToRender: () => {
      return null
    },
    disabled: true,
  },
}

export type CategoriesTitles = keyof typeof categories
