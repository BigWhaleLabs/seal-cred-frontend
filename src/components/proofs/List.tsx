import { AccentText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useResizeDetector } from 'react-resize-detector'
import { useSnapshot } from 'valtio'
import ERC721ProofsList from 'components/proofs/ERC721/ERC721ProofsList'
import EmailProofList from 'components/proofs/Email/EmailProofList'
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
  const titleMessage = useResizeDetector({ handleWidth: false })
  const savedMessage = useResizeDetector({ handleWidth: false })

  const allGenerated =
    proofsCompleted.length > 0 && proofAddressesAvailableToCreate.length === 0

  return (
    <ProofsListContainer>
      <div ref={titleMessage.ref}>
        <Suspense fallback={<LoadingTitle />}>
          <ListTitle />
        </Suspense>
      </div>
      <div className={proofContentBlock} ref={ref}>
        <Scrollbar
          parentHeight={height}
          titlePadding={allGenerated ? titleMessage?.height : 0}
          bottomPadding={savedMessage?.height || 0}
        >
          <div className={innerScrollableBlock}>
            <EmailProofList />
            <ERC721ProofsList />
          </div>
        </Scrollbar>
        {proofsCompleted.length > 0 && (
          <div ref={savedMessage.ref}>
            <AccentText small primary color="text-primary">
              Created ZK proofs are saved in the browser even if you switch
              wallets.
            </AccentText>
          </div>
        )}
      </div>
    </ProofsListContainer>
  )
}
