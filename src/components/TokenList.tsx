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
                setLoadingStage(LoadingStage.sign)
                const signature = await EthStore.signMessage(
                  PublicAccountStore.mainEthWallet.address
                )
                console.log(PublicAccountStore.mainEthWallet.address)
                console.log('Signature', signature)

                setLoadingStage(LoadingStage.proof)
                const treeProof = await createTreeProof()
                console.log('Merkle proof', treeProof)

                setLoadingStage(LoadingStage.ecdsa)
                if (signature === undefined) throw Errors.noSignature
                const ecdsaInput = createEcdsaInput(signature)
                console.log('ECDSA input', ecdsaInput)

                setLoadingStage(LoadingStage.output)
                // const proof = await callProof(treeProof, ecdsaInput)

                const proof: ProofResponse = {
                  proof: {
                    pi_a: [
                      '0x2be2b9c4b499e223c14e089f0f98fe7fc538e11a255721a98b73f1f4e26a3675',
                      '0x17e37ca22fdca51f4b86e7e843799fe409b6f86683b771ef4101370ecdf3eac3',
                    ],
                    pi_b: [
                      [
                        '0x1726e526bdf785be6285b3f8c17ec099ea6918b915d852b2394252ff97317517',
                        '0x28a1d1a79154ddb9c402dc5e532205175a4cd09ebc1248f15e3cf8fe4c03144c',
                      ],
                      [
                        '0x2f874a3c56d8aec4a19440f7c8d0c98948267abd8fee5a373da88f3dcaea5544',
                        '0x0f52d2de46c94d007f86fec2bef845c9f79561ac383650b70d03939e87db5bf7',
                      ],
                    ],
                    pi_c: [
                      '0x28771bd0d5e0630962902fc3b66020a83a4b63a21d771163be2ba5d14b569923',
                      '0x179e1472c562ad11746cfb87680af43a8fe54c01f67eccc2e9253117099ebbba',
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
                const txResult = await PublicAccountStore.mintDerivative(proof)
                console.log('Tx result', txResult)
                setMinted(true)
              } catch (error) {
                console.error('error: ' + error)

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
