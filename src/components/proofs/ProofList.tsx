import { AccentText, BodyText, HintText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AvailableProofsList from 'components/proofs/AvailableProofsList'
import EmailProof from 'components/proofs/EmailProof'
import HintCard from 'components/badges/HintCard'
import LoadingCard from 'components/LoadingCard'
import ProofSection from 'components/ProofSection'
import ProofStore from 'stores/ProofStore'
import ReadyERC721ProofsList from 'components/proofs/ReadyERC721ProofsList'
import ReadyEmailProof from 'components/proofs/ReadyEmailProof'
import Scrollbar from 'components/Scrollbar'
import proofStore from 'stores/ProofStore'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'
import walletStore from 'stores/WalletStore'

function ProofListSuspended() {
  const { account } = useSnapshot(walletStore)
  const { emailProofsCompleted } = useSnapshot(ProofStore)
  const { ERC721ProofsCompleted } = useSnapshot(proofStore)
  const { proofsCompleted } = useSnapshot(proofStore)
  const proofAddressesAvailableToCreate = useProofAddressesAvailableToCreate()

  const nothingToGenerate =
    ERC721ProofsCompleted.length === 0 &&
    proofAddressesAvailableToCreate.length === 0

  return (
    <>
      <Scrollbar>
        <div className={space('space-y-2')}>
          <ProofSection title={<BodyText>NFTs</BodyText>}>
            <ReadyERC721ProofsList />
            {account && (
              <AvailableProofsList proofs={proofAddressesAvailableToCreate} />
            )}
            {nothingToGenerate && (
              <HintCard small>
                <HintText bold center>
                  No NFTs to proof
                </HintText>
              </HintCard>
            )}
          </ProofSection>

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
    <Suspense fallback={<LoadingCard title="" subtitle="" />}>
      <ProofListSuspended />
    </Suspense>
  )
}
