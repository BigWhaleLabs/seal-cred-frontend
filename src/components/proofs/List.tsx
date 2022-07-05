import { AccentText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import ERC721ProofsList from 'components/proofs/ERC721ProofsList'
import EmailProofList from 'components/proofs/EmailProofList'
import ListTitle from 'components/proofs/ListTitle'
import LoadingCard from 'components/proofs/LoadingCard'
import Scrollbar from 'components/Scrollbar'
import classnames, {
  display,
  flexDirection,
  flexGrow,
  space,
} from 'classnames/tailwind'
import proofStore from 'stores/ProofStore'

const proofContentBlock = classnames(
  display('flex'),
  flexDirection('flex-col'),
  flexGrow('grow'),
  space('space-y-2')
)

export default function () {
  const { proofsCompleted } = useSnapshot(proofStore)

  return (
    <Suspense fallback={<LoadingCard />}>
      <ListTitle />
      <Scrollbar>
        <div className={proofContentBlock}>
          <ERC721ProofsList />
          <EmailProofList />
        </div>
      </Scrollbar>
      {proofsCompleted.length > 0 && (
        <AccentText small primary color="text-primary">
          Created ZK proofs are saved in the browser even if you switch wallets.
        </AccentText>
      )}
    </Suspense>
  )
}
