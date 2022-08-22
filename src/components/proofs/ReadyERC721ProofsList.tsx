import { useSnapshot } from 'valtio'
import ContractListContainer from 'components/proofs/ContractListContainer'
import Network from 'models/Network'
import Proof from 'components/proofs/Proof'
import ProofStore from 'stores/ProofStore'
import networkPick from 'helpers/network/networkPick'

export default function ({ network }: { network: Network }) {
  const { goerliERC721ProofsCompleted, mainnetERC721ProofsCompleted } =
    useSnapshot(ProofStore)

  const ERC721ProofsCompleted = networkPick(
    network,
    goerliERC721ProofsCompleted,
    mainnetERC721ProofsCompleted
  )

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
                network={network}
              />
            ))}
        </ContractListContainer>
      )}
    </>
  )
}
