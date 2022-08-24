import { AccentText, BodyText } from 'components/ui/Text'
import { DataKeys } from 'models/DataKeys'
import { useSnapshot } from 'valtio'
import BaseProof from 'helpers/proofs/BaseProof'
import EmailProof from 'components/proofs/EmailProof'
import ProofSection from 'components/proofs/ProofSection'
import ProofStore from 'stores/ProofStore'
import ProofsList from 'components/proofs/ProofsList'

export default function ({ dataKey }: { dataKey: DataKeys }) {
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
      <ProofsList dataKey={dataKey} proofs={proofsCompleted as BaseProof[]} />
      <EmailProof />
    </ProofSection>
  )
}
