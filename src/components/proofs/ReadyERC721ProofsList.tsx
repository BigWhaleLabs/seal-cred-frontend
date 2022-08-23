import { DataKeys } from 'models/DataKeys'
import { useSnapshot } from 'valtio'
import BaseProof from 'helpers/proofs/BaseProof'
import ContractListContainer from 'components/proofs/ContractListContainer'
import Proof from 'components/proofs/Proof'
import ProofStore from 'stores/ProofStore'

export default function ({ dataKey }: { dataKey: DataKeys }) {
  const { proofsCompleted } = useSnapshot(ProofStore[dataKey])

  if (proofsCompleted.length === 0) return null

  return (
    <ContractListContainer>
      {(Array.from(proofsCompleted) as BaseProof[])
        .sort((a, b) => (a.account === b.account ? 0 : -1))
        .map((proof) => (
          <Proof
            dataKey={dataKey}
            proof={proof}
            contractAddress={proof.origin}
            key={`${proof.origin}-${proof.account}`}
          />
        ))}
    </ContractListContainer>
  )
}
