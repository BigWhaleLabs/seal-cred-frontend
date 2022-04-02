import { BadgeText, SubBadgeText } from 'components/Text'
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
import { useState } from 'react'
import Button from 'components/Button'
import EthStore from 'stores/EthStore'
import PublicAccountStore from 'stores/PublicAccountStore'
import callProof from 'helpers/callProof'
import createEcdsaInput from 'helpers/createEcdsaInput'
import createTreeProof from 'helpers/createTreeProof'

const listWrapper = classnames(
  display('flex'),
  justifyContent('justify-start'),
  alignItems('items-center'),
  padding('py-2')
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

export const TokenList = () => {
  const [loadingMint, setLoadingMint] = useState(false)
  const [loadingStage, setLoadingStage] = useState<LoadingStage>(
    LoadingStage.clear
  )

  return (
    <div className={listWrapper}>
      <div className={listTokenTitle}>
        <BadgeText>Dosu 1 wave invite holder</BadgeText>
        {loadingStage && <SubBadgeText>{loadingStage}</SubBadgeText>}
      </div>

      <div className={listTokenAction}>
        <Button
          color="success"
          loading={loadingMint}
          onClick={async () => {
            setLoadingMint(true)
            try {
              setLoadingStage(LoadingStage.sign)
              const signature = await EthStore.signMessage(
                PublicAccountStore.mainEthWallet.address
              )
              console.log(signature)

              setLoadingStage(LoadingStage.proof)
              const treeProof = await createTreeProof()
              console.log(treeProof)

              setLoadingStage(LoadingStage.ecdsa)
              const ecdsaInput = await createEcdsaInput()
              console.log(ecdsaInput)

              setLoadingStage(LoadingStage.output)
              const proof = await callProof(treeProof, ecdsaInput)
              console.log(proof)

              // setLoadingStage(LoadingStage.mint)
              // const txResult = await EthStore.mintDerivative()
              // console.log(txResult)
            } catch (e) {
              console.error('Get error: ', e)
            } finally {
              setLoadingStage(LoadingStage.clear)
              setLoadingMint(false)
            }
          }}
          disabled={!!EthStore.ethError}
          badge
        >
          Mint
        </Button>
      </div>
    </div>
  )
}

export default TokenList
