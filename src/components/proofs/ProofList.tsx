import { AccentText, BodyText, HintText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AvailableProofsList from 'components/proofs/AvailableProofsList'
import EmailProof from 'components/proofs/EmailProof'
import HintCard from 'components/badges/HintCard'
import ListTitleSuspended from 'components/proofs/ListTitleSuspended'
import Network from 'models/Network'
import ProofSectionLoading from 'components/proofs/ProofSectionLoading'
import ProofStore from 'stores/ProofStore'
import ReadyERC721ProofsList from 'components/proofs/ReadyERC721ProofsList'
import ReadyEmailProof from 'components/proofs/ReadyEmailProof'
import Scrollbar from 'components/Scrollbar'
import Section from 'components/Section'
import WalletStore from 'stores/WalletStore'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

const MainnetSectionSuspended = () => {
  const { account } = useSnapshot(WalletStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const mainnetProofAddressesAvailableToCreate =
    useProofAddressesAvailableToCreate(Network.Mainnet)

  const nothingToGenerateMainnet =
    proofsCompleted.length === 0 &&
    mainnetProofAddressesAvailableToCreate.length === 0

  return (
    <>
      <ReadyERC721ProofsList network={Network.Mainnet} />
      {account && (
        <AvailableProofsList
          proofs={mainnetProofAddressesAvailableToCreate}
          network={Network.Mainnet}
        />
      )}
      {nothingToGenerateMainnet && (
        <HintCard small>
          <HintText bold center>
            No NFTs to proof
          </HintText>
        </HintCard>
      )}
    </>
  )
}

const GoerliSectionSuspended = () => {
  const { account } = useSnapshot(WalletStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const goerliProofAddressesAvailableToCreate =
    useProofAddressesAvailableToCreate(Network.Goerli)

  const nothingToGenerateGoerli =
    proofsCompleted.length === 0 &&
    goerliProofAddressesAvailableToCreate.length === 0

  return (
    <>
      <ReadyERC721ProofsList network={Network.Goerli} />
      {account && (
        <AvailableProofsList
          proofs={goerliProofAddressesAvailableToCreate}
          network={Network.Goerli}
        />
      )}
      {nothingToGenerateGoerli && (
        <HintCard small>
          <HintText bold center>
            No NFTs to proof
          </HintText>
        </HintCard>
      )}
    </>
  )
}

const AdditionalSectionSuspended = () => {
  const { emailProofsCompleted } = useSnapshot(ProofStore)

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        {Array.from(emailProofsCompleted).map((proof, index) => (
          <ReadyEmailProof proof={proof} key={`${proof.domain}-${index}`} />
        ))}
        <EmailProof />
      </Suspense>
    </>
  )
}

const SavedProofsMessageSuspended = () => {
  const { proofsCompleted } = useSnapshot(ProofStore)

  return (
    <Suspense fallback={<div>loading...</div>}>
      {proofsCompleted.length > 0 ? (
        <AccentText small primary color="text-primary">
          Created ZK proofs are saved in the browser even if you switch wallets.
        </AccentText>
      ) : null}
    </Suspense>
  )
}

export default function () {
  return (
    <>
      <Suspense fallback={<div>Start proofing!</div>}>
        <ListTitleSuspended />
      </Suspense>
      <Scrollbar>
        <div className={space('space-y-2')}>
          <Section title={<BodyText>Mainnet NFTs</BodyText>}>
            <ProofSectionLoading>
              <MainnetSectionSuspended />
            </ProofSectionLoading>
          </Section>
          <Section title={<BodyText>Goerli NFTs</BodyText>}>
            <Suspense fallback={<div>loading...</div>}>
              <GoerliSectionSuspended />
            </Suspense>
          </Section>
          <Section
            title={
              <BodyText>
                Additional proofs{' '}
                <AccentText color="text-tertiary" bold>
                  New!
                </AccentText>
              </BodyText>
            }
          >
            <AdditionalSectionSuspended />
          </Section>
        </div>
      </Scrollbar>
      <SavedProofsMessageSuspended />
    </>
  )
}
