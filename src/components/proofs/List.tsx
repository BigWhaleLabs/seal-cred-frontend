import { AccentText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useResizeDetector } from 'react-resize-detector'
import { useSnapshot } from 'valtio'
import ERC721ProofsList from 'components/proofs/ERC721ProofsList'
import EmailProofList from 'components/proofs/EmailProofList'
import ListTitle from 'components/proofs/ListTitle'
import LoadingTitle from 'components/proofs/LoadingTitle'
import ProofsListContainer from 'components/proofs/ListContainer'
import ScrollShadow from 'components/ScrollShadow'
import classnames, {
  display,
  flexDirection,
  flexGrow,
  overflow,
  space,
} from 'classnames/tailwind'
import proofStore from 'stores/ProofStore'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

const proofContentBlock = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-4'),
  flexGrow('grow'),
  overflow('overflow-y-auto'),
  space('space-y-2')
)

export default function () {
  const { proofsCompleted } = useSnapshot(proofStore)
  const proofAddressesAvailableToCreate = useProofAddressesAvailableToCreate()
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
      <div className={proofContentBlock}>
        <ScrollShadow>
          <ERC721ProofsList />
          <EmailProofList />
        </ScrollShadow>
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
