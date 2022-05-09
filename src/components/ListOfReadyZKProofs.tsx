import { AccentText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Complete from 'icons/Complete'
import ContractListContainer from 'components/ContractListContainer'
import ContractName from 'components/ContractName'
import ProofLine from 'components/ProofLine'
import ProofStore from 'stores/ProofStore'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  fontFamily,
  lineHeight,
  space,
} from 'classnames/tailwind'

const proofText = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2'),
  alignItems('items-center'),
  fontFamily('font-primary'),
  lineHeight('leading-5')
)

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
              <div className={proofText}>
                <AccentText bold color="text-yellow">
                  Proof {proof.account === account ? 'made' : 'saved'}
                </AccentText>
                <Complete color="yellow" />
              </div>
            </ProofLine>
          ))}
        </ContractListContainer>
      )}
    </>
  )
}
