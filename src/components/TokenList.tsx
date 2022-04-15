import { BadgeText, SubBadgeText } from 'components/Text'
import { ErrorList, handleError } from 'helpers/handleError'
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
import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import EthStore from 'stores/EthStore'
import PublicAccountStore from 'stores/PublicAccountStore'
import TokensStore from 'stores/TokensStore'
import callProof from 'helpers/callProof'
import createEcdsaInput from 'helpers/createEcdsaInput'
import createTreeProof from 'helpers/createTreeProof'

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

export const TokenList = () => {
  const { account } = useSnapshot(PublicAccountStore)

  const [loadingMint, setLoadingMint] = useState(false)
  const [loadingStage, setLoadingStage] = useState<LoadingStage>(
    LoadingStage.clear
  )
  const [minted, setMinted] = useState(false)

  useEffect(() => {
    async function checkMinted() {
      const result = await TokensStore.checkInviteToken(account)
      setMinted(!!result.dosu1wave)
    }

    void checkMinted()
  }, [account])

  return (
    <div className={listWrapper}>
      <div className={listTokenTitle}>
        <BadgeText>Dosu 1 wave invite holder</BadgeText>
        <SubBadgeText>{loadingStage}</SubBadgeText>
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
                PublicAccountStore.account.address
              )
              console.log('Signature', signature)

              setLoadingStage(LoadingStage.proof)
              const treeProof = await createTreeProof()
              console.log('Merkle proof', treeProof)

              setLoadingStage(LoadingStage.ecdsa)
              if (!signature) throw new Error(ErrorList.invalidSignature)
              const ecdsaInput = createEcdsaInput(signature)
              console.log('ECDSA input', ecdsaInput)

              setLoadingStage(LoadingStage.output)
              const proof = await callProof(treeProof, ecdsaInput)

              if (!proof.proof) throw new Error(ErrorList.invalidProof)
              console.log('Proof', proof)

              setLoadingStage(LoadingStage.mint)
              const txResult = await PublicAccountStore.mintDerivative(proof)
              console.log('Tx result', txResult)
              setMinted(true)
            } catch (error) {
              handleError(error)
            } finally {
              setLoadingStage(LoadingStage.clear)
              setLoadingMint(false)
            }
          }}
          disabled={minted}
          badge
        >
          {minted ? 'Minted' : 'Mint'}
        </Button>
      </div>
    </div>
  )
}

export default TokenList
