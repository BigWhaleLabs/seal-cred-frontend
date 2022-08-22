import { BodyText } from 'components/Text'
import { cursor } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import EmailProof from 'helpers/proofs/EmailProof'
import ReadyEmailProof from 'components/proofs/ReadyEmailProof'
import proofStore from 'stores/ProofStore'

export default function ({
  onSelectProof,
}: {
  onSelectProof: (proof: EmailProof) => void
}) {
  const { emailProofsCompleted } = useSnapshot(proofStore)
  return (
    <>
      <BodyText center>Select a proof to continue</BodyText>
      {Array.from(emailProofsCompleted).map((proof, index) => (
        <div
          onClick={() => onSelectProof(proof)}
          className={cursor('cursor-pointer')}
        >
          <ReadyEmailProof proof={proof} key={`${proof.domain}-${index}`} />
        </div>
      ))}
    </>
  )
}
