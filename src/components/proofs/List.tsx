import { Suspense } from 'preact/compat'
import ListTitle from 'components/proofs/ListTitle'
import LoadingCard from 'components/proofs/LoadingCard'
import ProofList from 'components/proofs/ProofList'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

function ListSuspended() {
  const availableToProofList = useProofAddressesAvailableToCreate()

  return (
    <>
      <ListTitle availableToProofList={availableToProofList} />
      <ProofList />
    </>
  )
}

export default function () {
  return (
    <Suspense fallback={<LoadingCard />}>
      <ListSuspended />
    </Suspense>
  )
}
