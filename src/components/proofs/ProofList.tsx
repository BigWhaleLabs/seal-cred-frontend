import { AccentText, BodyText, HintText } from 'components/Text'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AvailableProofsList from 'components/proofs/AvailableProofsList'
import EmailProof from 'components/proofs/EmailProof'
import HintCard from 'components/badges/HintCard'
import Network from 'models/Network'
import ProofStore from 'stores/ProofStore'
import ReadyERC721ProofsList from 'components/proofs/ReadyERC721ProofsList'
import ReadyEmailProof from 'components/proofs/ReadyEmailProof'
import Scrollbar from 'components/Scrollbar'
import Section from 'components/Section'
import WalletStore from 'stores/WalletStore'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

export default function () {
  const { account } = useSnapshot(WalletStore)
  const { emailProofsCompleted, proofsCompleted } = useSnapshot(ProofStore)
  const goerliProofAddressesAvailableToCreate =
    useProofAddressesAvailableToCreate(Network.Goerli)
  const mainnetProofAddressesAvailableToCreate =
    useProofAddressesAvailableToCreate(Network.Mainnet)

  const hasCompletedProofs = proofsCompleted.length > 0
  const hasGoerliProofsToCreate =
    goerliProofAddressesAvailableToCreate.length > 0
  const hasMainnetProofsToCreate =
    mainnetProofAddressesAvailableToCreate.length > 0

  const nothingToGenerate =
    !hasCompletedProofs && !hasGoerliProofsToCreate && !hasMainnetProofsToCreate

  return (
    <>
      <Scrollbar>
        <div className={space('space-y-2')}>
          <Section
            title={<BodyText>Mainnet NFTs</BodyText>}
            show={hasMainnetProofsToCreate}
          >
            <ReadyERC721ProofsList network={Network.Mainnet} />
            {account && (
              <AvailableProofsList
                proofs={mainnetProofAddressesAvailableToCreate}
                network={Network.Mainnet}
              />
            )}
          </Section>
          <Section
            title={<BodyText>Goerli NFTs</BodyText>}
            show={hasGoerliProofsToCreate}
          >
            <ReadyERC721ProofsList network={Network.Goerli} />
            {account && (
              <AvailableProofsList
                proofs={goerliProofAddressesAvailableToCreate}
                network={Network.Goerli}
              />
            )}
          </Section>
          {nothingToGenerate && (
            <HintCard small>
              <HintText bold center>
                No NFTs to proof
              </HintText>
            </HintCard>
          )}
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
      {hasCompletedProofs && (
        <AccentText small primary color="text-primary">
          Created ZK proofs are saved in the browser even if you switch wallets.
        </AccentText>
      )}
    </>
  )
}
