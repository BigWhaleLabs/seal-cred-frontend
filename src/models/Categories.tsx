import { JSX } from 'preact/jsx-runtime'
import { classnames, height, width } from 'classnames/tailwind'
import ERC721ProofSection from 'components/proofs/ERC721ProofSection'
import Email from 'icons/Email'
import EmailProof from 'components/proofs/EmailProof'
import EmailProofType from 'helpers/EmailProof'
import Network from 'models/Network'
import Nft from 'icons/Nft'
import ProofSection from 'components/ProofSection'
import ReadyEmailProof from 'components/proofs/ReadyEmailProof'

const emailIconSizes = classnames(width('w-4'), height('h-3'))

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
    icon: (
      <div className={emailIconSizes}>
        <Email customSize inheritStrokeColor />
      </div>
    ),
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
}

export type CategoriesTitles = keyof typeof categories
