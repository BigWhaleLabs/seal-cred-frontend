import { Suspense, SuspenseList } from 'preact/compat'
import CardTitle from 'components/CardTitle'
import ListTitle from 'components/proofs/ListTitle'
import LoadingCard from 'components/LoadingCard'
import ProofList from 'components/proofs/ProofList'

export default function () {
  return (
    <SuspenseList revealOrder="together">
      <Suspense
        fallback={
          <CardTitle
            title="Loading..."
            subtitle="Please, wait until I load supported NFTs, it takes time"
          />
        }
      >
        <ListTitle />
      </Suspense>
      <Suspense fallback={<LoadingCard title="" subtitle="" />}>
        <ProofList />
      </Suspense>
    </SuspenseList>
  )
}
