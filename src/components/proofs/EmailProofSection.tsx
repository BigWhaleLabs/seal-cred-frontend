import { AccentText, BodyText } from 'components/ui/Text'
import { DataKey } from 'models/DataKey'
import { useSnapshot } from 'valtio'
import EmailProof from 'components/proofs/EmailProof'
import Proof from 'models/Proof'
import ProofSection from 'components/proofs/ProofSection'
import ProofStore from 'stores/ProofStore'
import ProofsList from 'components/proofs/ProofsList'

export default function ({ dataKey }: { dataKey: DataKey }) {
  const { proofsCompleted } = useSnapshot(ProofStore[dataKey])

  return (
    <ProofSection
      title={
        <BodyText>
          Additional proofs{' '}
          <AccentText color="text-tertiary" bold>
            New!
          </AccentText>
        </BodyText>
      }
    >
      <ProofsList dataKey={dataKey} proofs={proofsCompleted as Proof[]} />
      <EmailProof />
    </ProofSection>
  )
}
