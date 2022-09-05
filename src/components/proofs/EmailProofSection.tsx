import { DataKey } from 'models/DataKey'
import { useEffect } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import EmailDomainStore from 'stores/EmailDomainStore'
import EmailProof from 'components/proofs/EmailProof'
import Proof from 'models/Proof'
import ProofSection from 'components/proofs/ProofSection'
import ProofStore from 'stores/ProofStore'
import ProofsList from 'components/proofs/ProofsList'
import useUrlParams from 'hooks/useUrlParams'

export default function ({ dataKey }: { dataKey: DataKey }) {
  const { proofsCompleted } = useSnapshot(ProofStore[dataKey])
  const params = useUrlParams()

  useEffect(() => {
    if (params) {
      EmailDomainStore.emailDomain = params.domain
      EmailDomainStore.hasToken = !!params
    }
  }, [params])

  return (
    <ProofSection>
      <ProofsList dataKey={dataKey} proofs={proofsCompleted as Proof[]} />
      <EmailProof />
    </ProofSection>
  )
}
