import { AccentText } from 'components/ui/Text'
import { Suspense } from 'preact/compat'
import { dataKeys } from 'helpers/contracts/dataShapeObject'
import { space } from 'classnames/tailwind'
import ERC721ProofSection from 'components/proofs/ERC721ProofSection'
import EmailProofSection from 'components/proofs/EmailProofSection'
import Scrollbar from 'components/ui/Scrollbar'
import data, { BadgeSourceType } from 'data'
import useProofStore from 'hooks/useProofStore'

export function ProofListSuspended() {
  const { hasAnyProof } = useProofStore()

  const eRC721Ledgers = dataKeys.filter(
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
      {hasAnyProof && (
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
