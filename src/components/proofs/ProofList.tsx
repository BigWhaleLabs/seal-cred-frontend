import { AccentText, BodyText } from 'components/Text'
import { DataKeys } from 'models/DataKeys'
import { Suspense } from 'preact/compat'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import ERC721ProofSection from 'components/proofs/ERC721ProofSection'
import EmailProof from 'components/proofs/EmailProof'
import ProofSection from 'components/ProofSection'
import ProofStore from 'stores/ProofStore'
import ReadyEmailProof from 'components/proofs/ReadyEmailProof'
import Scrollbar from 'components/Scrollbar'
import WalletStore from 'stores/WalletStore'
import data, { BadgeSourceType } from 'data'

export function ProofListSuspended() {
  const { account } = useSnapshot(WalletStore)
  const stores = useSnapshot(ProofStore)

  const hasCompletedProofs = Object.values(stores).some(
    (store) => store.proofsCompleted.length > 0
  )

  return (
    <>
      <Scrollbar>
        <div className={space('space-y-2')}>
          {account &&
            (Object.keys(data) as DataKeys[]).map(
              (ledgerName) =>
                data[ledgerName].badgeType === BadgeSourceType.ERC721 && (
                  <ERC721ProofSection dataKey={ledgerName} account={account} />
                )
            )}
          <ProofSection
            title={
              <BodyText>
                Additional proofs{' '}
                <AccentText color="text-tertiary" bold>
                  New!
                </AccentText>
              </BodyText>
            }
          >
            {Array.from(stores['Email'].proofsCompleted).map((proof, index) => (
              <ReadyEmailProof proof={proof} key={`${proof.origin}-${index}`} />
            ))}
            <EmailProof />
          </ProofSection>
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
