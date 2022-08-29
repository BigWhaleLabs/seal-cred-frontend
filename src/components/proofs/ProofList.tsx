import { AccentText, BodyText } from 'components/Text'
import { CategoriesTitles, categories } from 'models/Categories'
import { Suspense, useState } from 'preact/compat'
import {
  classnames,
  display,
  flex,
  flexDirection,
  gap,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import DesktopProofCategories from 'components/proofs/DesktopProofCategories'
import MobileProofCategories from 'components/proofs/MobileProofCategories'
import ProofStore from 'stores/ProofStore'
import Scrollbar from 'components/Scrollbar'
import WalletStore from 'stores/WalletStore'

const proofList = classnames(
  display('flex'),
  flex('flex-1'),
  flexDirection('flex-col'),
  gap('gap-y-2')
)
const menuWrapper = classnames(display('flex'), gap('gap-x-4'))

export function ProofListSuspended() {
  const { account } = useSnapshot(WalletStore)
  const { emailProofsCompleted, proofsCompleted } = useSnapshot(ProofStore)
  const [category, setCategory] = useState<CategoriesTitles>('NFTs')

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
            <div className={display('hidden', 'md:block')}>
              <BodyText bold>{category}</BodyText>
            </div>
            {categories[category].contentToRender(
              account,
              emailProofsCompleted
            )}
          </div>
        </div>
      </Scrollbar>
      {proofsCompleted.length > 0 && (
        <AccentText small primary color="text-primary">
          Created ZK proofs are saved in the browser even if you switch wallets.
        </AccentText>
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
