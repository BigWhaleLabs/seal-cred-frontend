import { DataKey } from 'models/DataKey'
import { useSearchParams } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import EmailProof from 'components/proofs/EmailProof'
import Proof from 'models/Proof'
import ProofSection from 'components/proofs/ProofSection'
import ProofStore from 'stores/ProofStore'
import ProofsList from 'components/proofs/ProofsList'

export default function ({ dataKey }: { dataKey: DataKey }) {
  const { proofsCompleted } = useSnapshot(ProofStore[dataKey])
  const [searchParams] = useSearchParams()

  const domain = searchParams.get('domain') ?? ''
  const token = searchParams.get('token') ?? ''

  return (
    <ProofSection>
      <ProofsList dataKey={dataKey} proofs={proofsCompleted as Proof[]} />
      <EmailProof domain={domain} token={token} />
    </ProofSection>
  )
}
