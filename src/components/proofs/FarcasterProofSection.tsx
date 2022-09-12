import { DataKey } from 'models/DataKey'
import { useSnapshot } from 'valtio'
import FarcasterProof from 'components/proofs/FarcasterProof'
import Proof from 'models/Proof'
import ProofSection from 'components/proofs/ProofSection'
import ProofStore from 'stores/ProofStore'
import ProofsList from 'components/proofs/ProofsList'

export default function ({ dataKey }: { dataKey: DataKey }) {
  const { proofsCompleted } = useSnapshot(ProofStore[dataKey])

  return (
    <ProofSection>
      <ProofsList proofs={proofsCompleted as Proof[]} dataKey={dataKey} />
      <FarcasterProof />
    </ProofSection>
  )
}
