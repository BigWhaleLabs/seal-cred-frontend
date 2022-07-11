import { Suspense } from 'preact/compat'
import ListTitle from 'components/proofs/ListTitle'
import LoadingCard from 'components/proofs/LoadingCard'
import ProofList from 'components/proofs/ProofList'

function ListSuspended() {
  return (
    <>
      <ListTitle />
      <ProofList />
    </>
  )
}

export default function () {
  return (
    // <Suspense fallback={<LoadingCard />}>
    //   <ListSuspended />
    // </Suspense>
    <>
      <ListTitle />
      <ProofList />
    </>
  )
}
