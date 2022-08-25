import { AccentText, BodyText } from 'components/ui/Text'
import { DataKeys } from 'models/DataKeys'
import { useSnapshot } from 'valtio'
import EmailProof from 'components/proofs/EmailProof'
import Proof from 'models/Proof'
import ProofSection from 'components/proofs/ProofSection'
import ProofStore from 'stores/ProofStore'
import ProofsList from 'components/proofs/ProofsList'

export default function ({ dataKey }: { dataKey: DataKeys }) {
  const { proofsCompleted } = useSnapshot(ProofStore[dataKey])

  console.log(proofsCompleted)

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