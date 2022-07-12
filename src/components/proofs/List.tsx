import { Suspense } from 'preact/compat'
import LoadingCard from 'components/proofs/LoadingCard'
import ProofList from 'components/proofs/ProofList'

export default function () {
  return (
    <Suspense fallback={<LoadingCard />}>
      <ProofList />
    </Suspense>
  )
}
