import { BadgeText, ErrorText, SubBadgeText } from 'components/Text'
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
import { serializeError } from 'eth-rpc-errors'
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

const Errors = {
  insufficientFunds: "You don't have enough money on your public address",
  noSignature: "Error getting user's signature",
  invalidProof: 'Merkle Tree Proof is not valid',
  mintError: 'An error occurred while minting your Badge',
  unknown: 'An unknown error occurred, please contact us',
  clear: '',
}

export const TokenList = () => {
  const { accounts } = useSnapshot(EthStore)

  const [loadingMint, setLoadingMint] = useState(false)
  const [loadingStage, setLoadingStage] = useState<LoadingStage>(
    LoadingStage.clear
  )
  const [error, setError] = useState<string>(Errors.clear)
  const [minted, setMinted] = useState(false)

  useEffect(() => {
    async function checkMinted() {
      const result = await TokensStore.checkInviteToken(accounts[0])
      setMinted(!!result.dosu1wave)
    }

    void checkMinted()
  }, [accounts])

  return (
    <div className={listWrapper}>
      <div className={listTokenTitle}>
        <BadgeText>Dosu 1 wave invite holder</BadgeText>
        {error ? (
          <ErrorText>{error}</ErrorText>
        ) : (
          <SubBadgeText>{loadingStage}</SubBadgeText>
        )}
      </div>

      <div className={listTokenAction}>
        {!minted && (
          <Button
            color="success"
            loading={loadingMint}
            onClick={async () => {
              setLoadingMint(true)
              setError(Errors.clear)
              try {
                setLoadingStage(LoadingStage.sign)
                const signature = await EthStore.signMessage(
                  PublicAccountStore.mainEthWallet.address
                )
                console.log(signature)

                setLoadingStage(LoadingStage.proof)
                const treeProof = await createTreeProof()
                console.log('tree proof', treeProof)

                setLoadingStage(LoadingStage.ecdsa)
                const ecdsaInput = await createEcdsaInput()
                console.log(ecdsaInput)

                setLoadingStage(LoadingStage.output)
                const resp = await callProof(treeProof, ecdsaInput)
                if (!resp) throw Errors.invalidProof
                console.log(resp)

                setLoadingStage(LoadingStage.mint)
                const txResult = await PublicAccountStore.mintDerivative()
                console.log(txResult)
                setMinted(true)
              } catch (error) {
                console.error(error)

                if (typeof error === 'string') return setError(error)

                const message = serializeError(error).message
                if (/User denied message signature/.test(message))
                  return setError(Errors.noSignature)
                if (/cannot estimate gas/.test(message))
                  return setError(Errors.insufficientFunds)
                if (/eth_getBlockByNumber/.test(message))
                  return setError(Errors.mintError)

                setError(Errors.unknown)
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
        )}
      </div>
    </div>
  )
}

export default TokenList
