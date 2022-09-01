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
          onClick={() => onSelectProof(proof)}
          className={cursor('cursor-pointer')}
        >
          <Proof
            type="Email"
            original={proof.original}
            proof={proof}
            key={`${proof.original}-${index}`}
          />
        </div>
      ))}
    </>
  )
}
