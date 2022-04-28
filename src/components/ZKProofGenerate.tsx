import { BadgeText, SubBadgeText } from 'components/Text'
import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'
import { ErrorList, handleError } from 'helpers/handleError'
import { Suspense, useState } from 'react'
import {
  alignItems,
  classnames,
  display,
  flexDirection,
  justifyContent,
  justifySelf,
  padding,
  space,
  textColor,
  width,
} from 'classnames/tailwind'
import Button from 'components/Button'
import WalletStore from 'stores/WalletStore'
import createEcdsaInput from 'helpers/createEcdsaInput'
import proofStore from 'stores/ProofStore'

const listWrapper = classnames(
  display('flex'),
  justifyContent('justify-start'),
  alignItems('items-center'),
  padding('py-2'),
  space('space-x-2')
)
const listTokenTitle = classnames(
  display('flex'),
  flexDirection('flex-col'),
  width('w-full'),
  textColor('text-white')
)
const listTokenAction = classnames(
  justifySelf('justify-self-end'),
  display('flex'),
  alignItems('items-center'),
  flexDirection('flex-row'),
  space('space-x-2')
)

enum LoadingStage {
  sign = 'Signing message',
  ecdsa = 'Generating ecdsa inputs',
  proof = 'Generating the merkletree proof inputs',
  output = 'Generating the proof outputs',
  mint = 'Minting the nft',
  clear = '',
}

export const ZKProofGenerateContent = ({
  originalContract,
  derivativeContract,
}: {
  originalContract: ERC721
  derivativeContract: SCERC721Derivative
}) => {
  const [loadingStage, setLoadingStage] = useState<LoadingStage>(
    LoadingStage.clear
  )

  return (
    <div className={listWrapper}>
      <div className={listTokenTitle}>
        <BadgeText>{derivativeContract.name}</BadgeText>
        <SubBadgeText>{loadingStage}</SubBadgeText>
      </div>

      <div className={listTokenAction}>
        <Button
          color="success"
          onClick={async () => {
            try {
              setLoadingStage(LoadingStage.sign)
              const signature = await WalletStore.signMessage(
                originalContract.address
              )

              setLoadingStage(LoadingStage.ecdsa)
              if (!signature) throw new Error(ErrorList.invalidSignature)
              const ecdsaInput = createEcdsaInput(signature)

              setLoadingStage(LoadingStage.output)
              const proof = await proofStore.generate(
                originalContract.address,
                ecdsaInput
              )

              if (!proof.proof) throw new Error(ErrorList.invalidProof)
            } catch (error) {
              handleError(error)
            } finally {
              setLoadingStage(LoadingStage.clear)
            }
          }}
          badge
        >
          Generate
        </Button>
      </div>
    </div>
  )
}

function ZKProofGenerate(props: {
  originalContract: ERC721
  derivativeContract: SCERC721Derivative
}) {
  return (
    <Suspense fallback={'loading'}>
      <ZKProofGenerateContent {...props} />
    </Suspense>
  )
}

export default ZKProofGenerate
