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
import ProofResponse from 'models/ProofResponse'
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
                // setLoadingStage(LoadingStage.sign)
                // const signature = await EthStore.signMessage(
                //   PublicAccountStore.mainEthWallet.address
                // )
                // console.log('Signature', signature)

                // setLoadingStage(LoadingStage.proof)
                // const treeProof = await createTreeProof()
                // console.log('Merkle proof', treeProof)

                // setLoadingStage(LoadingStage.ecdsa)
                // const ecdsaInput = await createEcdsaInput()
                // console.log('ECDSA input', ecdsaInput)

                setLoadingStage(LoadingStage.output)
                // const proof = await callProof(treeProof, ecdsaInput)
                const proof: ProofResponse = {
                  proof: {
                    pi_a: [
                      '0x0822278288cd06bc8f13cec22800b9c659d4ec65be08083af691ad37c6b202d7',
                      '0x12ad4d551b648c12c62d19d74eaf4117dbc48fa09c34c48548c32b8896c2a47a',
                    ],
                    pi_b: [
                      [
                        '0x15d249dccba882718517e79ea1d028b28ebe31c558c6539990ad23fb7a9bd37d',
                        '0x1d2816213b2f6449cde19d0a800439a5e745e0df1c003f42a4f37fb1fe6aaf0b',
                      ],
                      [
                        '0x03293ef92005d511455f084019c8d9adf33bd9103bf3259f1453d89c9c995a4a',
                        '0x16dfe4be29eb462929a3ee652e01c076c4f891510390648c465540abae6ef673',
                      ],
                    ],
                    pi_c: [
                      '0x030136c4a083bef72c090bfc95f860abd50d6a0fb369690d8c18e344007b0784',
                      '0x0c98cad99f5ca1a87907e7852add432668a4de09afe0f726650e4f42bb63e14d',
                    ],
                    protocol: 'groth16',
                    curve: 'bn128',
                  },
                  publicSignals: [
                    '0x0000000000000000000000000000000000000000000000000000000000000001',
                    '0x0d41fba73f0dcde45a3683b4c16a32c1f0793268b3cfb01c8a1115aefc76da04',
                  ],
                }
                if (!proof.proof) throw Errors.invalidProof
                console.log('Proof', proof)

                setLoadingStage(LoadingStage.mint)
                console.log('where 1')
                const txResult = await PublicAccountStore.mintDerivative(proof)
                console.log('Tx result', txResult)
                setMinted(true)
              } catch (error) {
                console.error('i see' + error)

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
