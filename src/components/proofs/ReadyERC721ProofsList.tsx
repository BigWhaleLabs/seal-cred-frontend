import { useSnapshot } from 'valtio'
import ContractListContainer from 'components/proofs/ContractListContainer'
import Proof from 'components/proofs/Proof'
import ProofStore from 'stores/ProofStore'

export default function () {
  const { ERC721ProofsCompleted } = useSnapshot(ProofStore)

  return (
    <>
      {!!ERC721ProofsCompleted?.length && (
        <ContractListContainer>
          {Array.from(ERC721ProofsCompleted)
            .sort((a, b) => (a.account === b.account ? 0 : -1))
            .map((proof) => (
              <Proof
                proof={proof}
                contractAddress={proof.contract}
                key={`${proof.contract}-${proof.account}`}
              />
            ))}
        </ContractListContainer>
      )}
    </>
  )
}
