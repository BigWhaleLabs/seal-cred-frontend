import { Suspense } from 'preact/compat'
import ListTitle from 'components/proofs/ListTitle'
import LoadingCard from 'components/proofs/LoadingCard'
import ProofList from 'components/proofs/ProofList'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

function ListSuspended() {
  const proofAddressesAvailableToCreate = useProofAddressesAvailableToCreate()

  return (
    <>
      <ListTitle avaliableToProof={proofAddressesAvailableToCreate} />
      <ProofList avaliableToProof={proofAddressesAvailableToCreate} />
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
