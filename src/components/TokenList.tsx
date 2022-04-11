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
                      '3678848276176002336481436659418248944719488774622732651645224676080149988055',
                      '8447829545654419639111127746900423493127203351556922845651839437427735438458',
                    ],
                    pi_b: [
                      [
                        '13187899225836651088458614951216557283743281205360157867427792470839273369355',
                        '9870117483971353363995826856454303009291271438169379330884987781981184709501',
                      ],
                      [
                        '10346468289248965352074056335060368078501396390618828681102674029728259569267',
                        '1429813900078326658402633009668067381719856544197650789550821656151113423434',
                      ],
                    ],
                    pi_c: [
                      '1359083388171014812393177602087310445137107279188003677500455040645225711492',
                      '5697714956698750298815314528057628958739777499142434456041697240180425220429',
                    ],
                    protocol: 'groth16',
                    curve: 'bn128',
                  },
                  publicSignals: [
                    '1',
                    '5996648938077548996564300724299923339597259625825626499011021328422106749444',
                  ],
                }
                if (!proof.proof) throw Errors.invalidProof
                console.log('Proof', proof)

                setLoadingStage(LoadingStage.mint)
                const txResult = await PublicAccountStore.mintDerivative(proof)
                console.log('Tx result', txResult)
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
