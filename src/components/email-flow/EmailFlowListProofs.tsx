import { BodyText } from 'components/ui/Text'
import { cursor } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import Proof from 'components/proofs/Proof'
import ProofModel from 'models/Proof'
import proofStore from 'stores/ProofStore'

export default function ({
  onSelectProof,
}: {
  onSelectProof: (proof: ProofModel) => void
}) {
  const { proofsCompleted } = useSnapshot(proofStore['Email'])

  return (
    <>
      <BodyText center>Select a proof to continue</BodyText>
      {Array.from(proofsCompleted).map((proof, index) => (
        <div
          className={cursor('cursor-pointer')}
          onClick={() => onSelectProof(proof)}
        >
          <Proof
            key={`${proof.original}-${index}`}
            original={proof.original}
            proof={proof}
            type="Email"
          />
        </div>
      ))}
    </>
  )
}
