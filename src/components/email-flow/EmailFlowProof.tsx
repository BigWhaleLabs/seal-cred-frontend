import { BodyText, HeaderText } from 'components/Text'
import BadgeBlock from 'components/badges/BadgeBlock'
import BaseProof from 'helpers/proofs/BaseProof'
import MintedToken from 'models/MintedToken'
import ReadyEmailProof from 'components/proofs/ReadyEmailProof'

export default function ({
  proof,
  onMinted,
  onMintFailed,
}: {
  proof: BaseProof
  onMinted?: (minted?: MintedToken[]) => void
  onMintFailed?: (minted?: MintedToken[]) => void
}) {
  const headerTitle = proof.result ? 'Ready to mint!' : 'Creating your zk proof'

  const statusText = proof.result
    ? 'Mint your zkBadge below to add it to your wallet.'
    : 'This may take a second.'

  const proofCreated = !!proof.result

  return (
    <>
      <HeaderText extraLeading>{headerTitle}</HeaderText>
      <BodyText>{statusText}</BodyText>
      <ReadyEmailProof proof={proof} />
      {proofCreated && (
        <BadgeBlock
          proof={proof}
          onMinted={onMinted}
          onMintFailed={onMintFailed}
        />
      )}
    </>
  )
}
