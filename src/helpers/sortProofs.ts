import Proof, { ProofOrdering } from 'models/Proof'

export default function (proofs: readonly Proof[]) {
  return Array.from(proofs).sort(
    (
      { position: positionA = 0, status: statusA },
      { position: positionB = 0, status: statusB }
    ) =>
      statusA !== statusB
        ? ProofOrdering[statusA] - ProofOrdering[statusB]
        : positionA - positionB
  )
}
