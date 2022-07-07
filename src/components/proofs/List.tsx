import { AccentText } from 'components/Text'
import { Suspense, SuspenseList } from 'preact/compat'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import CardTitle from 'components/CardTitle'
import ERC721ProofsList from 'components/proofs/ERC721ProofsList'
import EmailProofList from 'components/proofs/EmailProofList'
import ListTitle from 'components/proofs/ListTitle'
import LoadingCard from 'components/LoadingCard'
import Scrollbar from 'components/Scrollbar'
import proofStore from 'stores/ProofStore'

export default function () {
  const { proofsCompleted } = useSnapshot(proofStore)

  return (
    <SuspenseList revealOrder="forwards">
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
      <Scrollbar>
        <div className={space('space-y-2')}>
          <Suspense fallback={<LoadingCard title="" subtitle="" />}>
            <ERC721ProofsList />
            <EmailProofList />
          </Suspense>
        </div>
      </Scrollbar>
      {proofsCompleted.length > 0 && (
        <AccentText small primary color="text-primary">
          Created ZK proofs are saved in the browser even if you switch wallets.
        </AccentText>
      )}
    </SuspenseList>
  )
}
