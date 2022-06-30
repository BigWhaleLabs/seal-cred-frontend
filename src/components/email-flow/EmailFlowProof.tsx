import { BodyText, GradientSpan, HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import BadgeBlock from 'components/badges/BadgeBlock'
import BadgesOwnedForContract from 'components/badges/BadgesOwnedForContract'
import Button from 'components/Button'
import ContractsStore from 'stores/ContractsStore'
import EmailProof from 'helpers/EmailProof'
import ReadyEmailProof from 'components/proofs/ReadyEmailProof'
import SealCredStore from 'stores/SealCredStore'

export default function ({
  proof,
  resetEmail,
}: {
  proof: EmailProof
  resetEmail: () => void
}) {
  const { contractsOwned } = useSnapshot(ContractsStore)
  const { emailLedger } = useSnapshot(SealCredStore)
  const ledgerRecord = proof && emailLedger[proof.domain]

  const minted =
    ledgerRecord && contractsOwned.includes(ledgerRecord.derivativeContract)

  const headerTitle = minted
    ? 'Congrats!'
    : proof.result
    ? 'Ready to mint!'
    : 'Creating your zk proof'

  const statusText = minted
    ? proof.result
      ? 'You already have a zkBadge verifying your work email! You can choose another account to mint new zkBadge!'
      : 'You’ve minted a zkBadge verifying your work email!'
    : proof.result
    ? 'Mint your zkBadge below to add it to your wallet.'
    : 'This may take a second.'

  return (
    <>
      <HeaderText extraLeading>{headerTitle}</HeaderText>
      <BodyText>{statusText}</BodyText>
      <ReadyEmailProof proof={proof} />
      {minted ? (
        <>
          <BadgesOwnedForContract
            contractAddress={ledgerRecord?.derivativeContract}
          />
          <Button fullWidth center small type="secondary" onClick={resetEmail}>
            <GradientSpan
              bold
              gradientFrom="from-secondary"
              gradientTo="to-accent"
            >
              Try another email
            </GradientSpan>
          </Button>
        </>
      ) : (
        proof.result && <BadgeBlock proof={proof} />
      )}
    </>
  )
}
