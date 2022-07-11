import { Suspense } from 'preact/compat'
import ListTitle from 'components/proofs/ListTitle'
import LoadingCard from 'components/proofs/LoadingCard'
import ProofList from 'components/proofs/ProofList'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'
import useProofsAvailableToMint from 'hooks/useProofsAvailableToMint'

function ListSuspended() {
  const availableToProofList = useProofAddressesAvailableToCreate()
  useProofsAvailableToMint() // used to synchronize loading with badge card

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
