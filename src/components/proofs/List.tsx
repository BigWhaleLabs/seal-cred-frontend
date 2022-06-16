import { AccentText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import AvailableProofsList from 'components/proofs/AvailableProofsList'
import ListTitle from 'components/proofs/ListTitle'
import LoadingTitle from 'components/proofs/LoadingTitle'
import ProofsListContainer from 'components/proofs/ListContainer'
import ReadyProofsList from 'components/proofs/ReadyProofsList'
import Scrollbar from 'components/Scrollbar'
import WalletStore from 'stores/WalletStore'
import classnames, {
  display,
  flexDirection,
  flexGrow,
  space,
} from 'classnames/tailwind'
import proofStore from 'stores/ProofStore'

const innerScrollableBlock = space('space-y-2')
const proofContentBlock = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-4'),
  flexGrow('grow')
)

export default function () {
  const { account } = useSnapshot(WalletStore)
  const { proofsCompleted } = useSnapshot(proofStore)

  return (
    <ProofsListContainer>
      <Suspense fallback={<LoadingTitle />}>
        <ListTitle />
      </Suspense>
      <div className={proofContentBlock}>
        <Scrollbar>
          <div className={innerScrollableBlock}>
            <ReadyProofsList />
            {account && <AvailableProofsList />}
          </div>
        </Scrollbar>
        {proofsCompleted.length > 0 && (
          <AccentText small primary color="text-primary">
            Created ZK proofs are saved in the browser even if you switch
            wallets.
          </AccentText>
        )}
      </div>
    </ProofsListContainer>
  )
}