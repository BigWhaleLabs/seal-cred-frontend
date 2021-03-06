import { AccentText, BodyText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import ERC721ProofSection from 'components/proofs/ERC721ProofSection'
import EmailProof from 'components/proofs/EmailProof'
import Network from 'models/Network'
import ProofSection from 'components/ProofSection'
import ProofStore from 'stores/ProofStore'
import ReadyEmailProof from 'components/proofs/ReadyEmailProof'
import Scrollbar from 'components/Scrollbar'
import WalletStore from 'stores/WalletStore'

export function ProofListSuspended() {
  const { account } = useSnapshot(WalletStore)
  const { emailProofsCompleted, proofsCompleted } = useSnapshot(ProofStore)

  return (
    <>
      <Scrollbar>
        <div className={space('space-y-2')}>
          {account && (
            <>
              <ERC721ProofSection account={account} network={Network.Mainnet} />
              <ERC721ProofSection account={account} network={Network.Goerli} />
            </>
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
            {Array.from(emailProofsCompleted).map((proof, index) => (
              <ReadyEmailProof proof={proof} key={`${proof.domain}-${index}`} />
            ))}
            <EmailProof />
          </ProofSection>
        </div>
      </Scrollbar>
      {proofsCompleted.length > 0 && (
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
