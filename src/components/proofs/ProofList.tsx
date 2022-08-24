import { AccentText } from 'components/ui/Text'
import { DataKeys } from 'models/DataKeys'
import { Suspense } from 'preact/compat'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import ERC721ProofSection from 'components/proofs/ERC721ProofSection'
import EmailProofSection from 'components/proofs/EmailProofSection'
import ProofStore from 'stores/ProofStore'
import Scrollbar from 'components/ui/Scrollbar'
import data, { BadgeSourceType } from 'data'

export function ProofListSuspended() {
  const stores = useSnapshot(ProofStore)

  const hasCompletedProofs = Object.values(stores).some(
    (store) => store.proofsCompleted.length > 0
  )

  const eRC721Ledgers = (Object.keys(data) as DataKeys[]).filter(
    (ledgerName) => data[ledgerName].badgeType === BadgeSourceType.ERC721
  )

  return (
    <>
      <Scrollbar>
        <div className={space('space-y-2')}>
          {eRC721Ledgers.map((ledgerName) => (
            <ERC721ProofSection dataKey={ledgerName} />
          ))}
          <EmailProofSection dataKey={'Email'} />
        </div>
      </Scrollbar>
      {hasCompletedProofs && (
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
