import { BodyText, HeaderText } from 'components/ui/Text'
import { useSnapshot } from 'valtio'
import BadgeBlock from 'components/badges/BadgeBlock'
import EmailFlowBadge from 'components/email-flow/EmailFlowBadge'
import Network from 'models/Network'
import Proof from 'components/proofs/Proof'
import ProofModel from 'models/Proof'
import SealCredStore from 'stores/SealCredStore'
import useContractTokens from 'hooks/useContractTokens'

export default function ({
  proof,
  onReset,
}: {
  proof: ProofModel
  onReset: () => void
}) {
  const { ledgers } = useSnapshot(SealCredStore)
  const emailLedger = ledgers['Email']
  const derivativeAddress = emailLedger[proof.original]
  const tokens = useContractTokens(derivativeAddress, Network.Goerli)
  const minted = Object.keys(tokens).map((tokenId) => Number(tokenId))

  const headerTitle = proof.result ? 'Ready to mint!' : 'Creating your zk proof'

  const statusText = proof.result
    ? 'Mint your zkBadge below to add it to your wallet.'
    : 'This may take a second.'

  const proofCreated = !!proof.result

  if (minted.length > 0)
    return (
      <EmailFlowBadge
        address={derivativeAddress}
        ids={minted}
        resetEmail={onReset}
      />
    )

  return (
    <>
      <HeaderText extraLeading>{headerTitle}</HeaderText>
      <BodyText>{statusText}</BodyText>
      <Proof type="Email" original={proof.original} proof={proof} />
      {proofCreated && (
        <BadgeBlock proof={proof} onMinted={onReset} onMintFailed={onReset} />
      )}
    </>
  )
}
