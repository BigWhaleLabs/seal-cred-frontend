import { BodyText, HeaderText } from 'components/Text'
import BadgeBlock from 'components/badges/BadgeBlock'
import EmailProof from 'helpers/EmailProof'
import MintedToken from 'models/MintedToken'
import ReadyEmailProof from 'components/proofs/ReadyEmailProof'

export default function ({
  proof,
  onMint,
}: {
  proof: EmailProof
  onMint?: (minted?: MintedToken[]) => void
}) {
  const headerTitle = proof.result ? 'Ready to mint!' : 'Creating your zk proof'

  const statusText = proof.result
    ? 'Mint your zkBadge below to add it to your wallet.'
    : 'This may take a second.'

  return (
    <>
      <HeaderText extraLeading>{headerTitle}</HeaderText>
      <BodyText>{statusText}</BodyText>
      <ReadyEmailProof proof={proof} />
      {proof.result && <BadgeBlock proof={proof} onMint={onMint} />}
    </>
  )
}
