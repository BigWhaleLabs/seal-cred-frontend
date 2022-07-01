import { AccentText } from 'components/Text'
import { RefObject, Suspense } from 'preact/compat'
import { useScrollShadow } from 'use-scroll-shadow'
import { useSnapshot } from 'valtio'
import ERC721ProofsList from 'components/proofs/ERC721ProofsList'
import EmailProofList from 'components/proofs/EmailProofList'
import ListTitle from 'components/proofs/ListTitle'
import LoadingCard from 'components/proofs/LoadingCard'
import classnames, {
  display,
  flexDirection,
  flexGrow,
  overflow,
  space,
} from 'classnames/tailwind'
import proofStore from 'stores/ProofStore'

const proofContentBlock = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-4'),
  flexGrow('grow'),
  overflow('overflow-y-auto'),
  space('space-y-2')
)

export default function () {
  const { proofsCompleted } = useSnapshot(proofStore)
  const { elementRef } = useScrollShadow()

  return (
    <Suspense fallback={<LoadingCard />}>
      <ListTitle />
      <div
        className={proofContentBlock}
        ref={elementRef as RefObject<HTMLDivElement>}
      >
        <ERC721ProofsList />
        <EmailProofList />
      </div>
      {proofsCompleted.length > 0 && (
        <AccentText small primary color="text-primary">
          Created ZK proofs are saved in the browser even if you switch wallets.
        </AccentText>
      )}
    </Suspense>
  )
}
