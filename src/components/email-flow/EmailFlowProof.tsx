import { BodyText, HeaderText } from 'components/ui/Text'
import BadgeBlock from 'components/badges/BadgeBlock'
import MintedToken from 'models/MintedToken'
import Proof from 'components/proofs/Proof'
import ProofModel from 'models/Proof'

export default function ({
  proof,
  onMinted,
  onMintFailed,
}: {
  proof: ProofModel
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
      <Proof type="Email" original={proof.original} proof={proof} />
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
