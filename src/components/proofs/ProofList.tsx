import { AccentText, BodyText, HintText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AvailableProofsList from 'components/proofs/AvailableProofsList'
import EmailProof from 'components/proofs/EmailProof'
import HintCard from 'components/badges/HintCard'
import ListTitle from 'components/proofs/ListTitle'
import LoadingCard from 'components/proofs/LoadingCard'
import Network from 'models/Network'
import ProofStore from 'stores/ProofStore'
import ReadyERC721ProofsList from 'components/proofs/ReadyERC721ProofsList'
import ReadyEmailProof from 'components/proofs/ReadyEmailProof'
import Scrollbar from 'components/Scrollbar'
import Section from 'components/Section'
import WalletStore from 'stores/WalletStore'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

function ProofListSuspended() {
  const { account } = useSnapshot(WalletStore)
  const { emailProofsCompleted, proofsCompleted } = useSnapshot(ProofStore)
  const availableToProofList = useProofAddressesAvailableToCreate()
  const goerliProofAddressesAvailableToCreate =
    useProofAddressesAvailableToCreate(Network.Goerli)
  const mainnetProofAddressesAvailableToCreate =
    useProofAddressesAvailableToCreate(Network.Mainnet)

  const nothingToGenerateMainnet =
    proofsCompleted.length === 0 &&
    mainnetProofAddressesAvailableToCreate.length === 0

  const nothingToGenerateGoerli =
    proofsCompleted.length === 0 &&
    goerliProofAddressesAvailableToCreate.length === 0

  return (
    <>
      <ListTitle availableToProofList={availableToProofList} />
      <Scrollbar>
        <div className={space('space-y-2')}>
          <Section title={<BodyText>Mainnet NFTs</BodyText>}>
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
          </Section>
          <Section title={<BodyText>Goerli NFTs</BodyText>}>
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
            {Array.from(emailProofsCompleted).map((proof, index) => (
              <ReadyEmailProof proof={proof} key={`${proof.domain}-${index}`} />
            ))}
            <EmailProof />
          </Section>
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
    <Suspense fallback={<LoadingCard />}>
      <ProofListSuspended />
    </Suspense>
  )
}
