import { useSnapshot } from 'valtio'
import Complete from 'icons/Complete'
import ContractListContainer from 'components/ContractListContainer'
import ContractName from 'components/ContractName'
import ProofButton from 'components/ProofButton'
import ProofLine from 'components/ProofLine'
import ProofStore from 'stores/ProofStore'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'

export default function ListOfReadyZKProofs() {
  const { originalContracts } = useSnapshot(StreetCredStore)
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { account } = useSnapshot(WalletStore)

  return (
    <>
      {originalContracts && !!proofsCompleted?.length && (
        <ContractListContainer>
          {proofsCompleted.map((proof) => (
            <ProofLine>
              <ContractName address={proof.contract} />
              <ProofButton color="yellow">
                <span>
                  Proof {proof.account === account ? 'made' : 'saved'}
                </span>
                <Complete color="yellow" />
              </ProofButton>
            </ProofLine>
          ))}
        </ContractListContainer>
      )}
    </>
  )
}
