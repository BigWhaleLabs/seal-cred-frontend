import { AccentText, BodyText } from 'components/ui/Text'
import { CategoriesTitles, categories } from 'models/Categories'
import { Suspense, useState } from 'preact/compat'
import {
  alignItems,
  classnames,
  display,
  flex,
  flexDirection,
  gap,
} from 'classnames/tailwind'
import { displayFrom } from 'helpers/visibilityClassnames'
import DesktopProofCategories from 'components/proofs/DesktopProofCategories'
import EmailDomainStore from 'stores/EmailDomainStore'
import MobileProofCategories from 'components/proofs/MobileProofCategories'
import Scrollbar from 'components/ui/Scrollbar'
import useProofStore from 'hooks/useProofStore'
import useUrlParams from 'hooks/useUrlParams'

const proofList = classnames(
  display('flex'),
  flex('flex-1'),
  flexDirection('flex-col'),
  gap('gap-y-2')
)
const menuWrapper = classnames(display('flex'), gap('gap-x-4'))
const bottomWrapper = classnames(
  display('flex'),
  flex('flex-1'),
  alignItems('items-end')
)

export function ProofListSuspended() {
  const params = useUrlParams()

  const [category, setCategory] = useState<CategoriesTitles>(
    params ? 'Email' : 'NFTs'
  )
  const { hasAnyProof } = useProofStore()
  if (params) {
    EmailDomainStore.emailDomain = params.domain
    EmailDomainStore.fromEmail = true
  } else {
    EmailDomainStore.fromEmail = false
  }

  return (
    <>
      <MobileProofCategories
        currentCategory={category}
        setCategory={setCategory}
      />
      <Scrollbar>
        <div className={menuWrapper}>
          <DesktopProofCategories
            currentCategory={category}
            setCategory={setCategory}
          />
          <div className={proofList}>
            <div className={displayFrom('md')}>
              <BodyText bold>{category}</BodyText>
            </div>
            {categories[category].contentToRender}
          </div>
        </div>
      </Scrollbar>
      {hasAnyProof && (
        <div className={bottomWrapper}>
          <AccentText small primary color="text-primary">
            Created ZK proofs are saved in the browser even if you switch
            wallets.
          </AccentText>
        </div>
      )}
    </>
  )
}

export default function () {
  return (
    <Suspense fallback={<div>Fetching proofs</div>}>
      <ProofListSuspended />
    </Suspense>
  )
}
