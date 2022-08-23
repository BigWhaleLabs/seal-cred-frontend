import { useSnapshot } from 'valtio'
import ContractListContainer from 'components/proofs/ContractListContainer'
import ERC721Proof from 'helpers/proofs/ERC721Proof'
import Network from 'models/Network'
import Proof from 'components/proofs/Proof'
import ProofStore from 'stores/ProofStore'

export default function ({ network }: { network: Network }) {
  const { proofsCompleted } = useSnapshot(ProofStore)

  const allERC721ProofsByNetwork = proofsCompleted.filter(
    (proof) => proof instanceof ERC721Proof && proof.network === network
  ) as ERC721Proof[]

  return (
    <>
      {!!allERC721ProofsByNetwork?.length && (
        <ContractListContainer>
          {Array.from(allERC721ProofsByNetwork)
            .sort((a, b) => (a.account === b.account ? 0 : -1))
            .map((proof) => (
              <Proof
                proof={proof}
                contractAddress={proof.contract}
                key={`${proof.contract}-${proof.account}`}
                network={network}
              />
            ))}
        </ContractListContainer>
      )}
    </>
  )
}
