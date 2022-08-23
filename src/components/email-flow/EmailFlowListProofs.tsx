import { BodyText } from 'components/Text'
import { cursor } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import BaseProof from 'helpers/proofs/BaseProof'
import ReadyEmailProof from 'components/proofs/ReadyEmailProof'
import proofStore from 'stores/ProofStore'

export default function ({
  onSelectProof,
}: {
  onSelectProof: (proof: BaseProof) => void
}) {
  const { proofsCompleted } = useSnapshot(proofStore['Email'])
  return (
    <>
      <BodyText center>Select a proof to continue</BodyText>
      {Array.from(proofsCompleted).map((proof, index) => (
        <div
          onClick={() => onSelectProof(proof)}
          className={cursor('cursor-pointer')}
        >
          <ReadyEmailProof proof={proof} key={`${proof.origin}-${index}`} />
        </div>
      ))}
    </>
  )
}
