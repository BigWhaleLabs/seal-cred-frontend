import { AccentText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useResizeDetector } from 'react-resize-detector'
import { useSnapshot } from 'valtio'
import ERC721ProofsList from 'components/proofs/ERC721ProofsList'
import EmailProofList from 'components/proofs/EmailProofList'
import ListTitle from 'components/proofs/ListTitle'
import LoadingTitle from 'components/proofs/LoadingTitle'
import ProofsListContainer from 'components/proofs/ListContainer'
import Scrollbar from 'components/Scrollbar'
import classnames, {
  display,
  flexDirection,
  flexGrow,
  space,
} from 'classnames/tailwind'
import proofStore from 'stores/ProofStore'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

const innerScrollableBlock = space('space-y-2')
const proofContentBlock = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-4'),
  flexGrow('grow')
)

export default function () {
  const { proofsCompleted } = useSnapshot(proofStore)
  const proofAddressesAvailableToCreate = useProofAddressesAvailableToCreate()
  const { height = 0, ref } = useResizeDetector({ handleWidth: false })

  const allGenerated =
    proofsCompleted.length > 0 && proofAddressesAvailableToCreate.length === 0

  return (
    <ProofsListContainer>
      <Suspense fallback={<LoadingTitle />}>
        <ListTitle />
      </Suspense>
      <div className={proofContentBlock} ref={ref}>
        <Scrollbar extraPadding={allGenerated} parentHeight={height}>
          <div className={innerScrollableBlock}>
            <EmailProofList />
            <ERC721ProofsList />
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
