import { BodyText, HeaderText } from 'components/ui/Text'
import { MintProof } from 'models/MintProof'
import BadgeBlock from 'components/badges/BadgeBlock'
import Proof from 'components/proofs/Proof'

export default function ({ proof, onMinted, onMintFailed }: MintProof) {
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
