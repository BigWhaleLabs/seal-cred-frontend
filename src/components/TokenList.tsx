import { BadgeText, ErrorText, SubBadgeText } from 'components/Text'
import { BadgesEnum } from 'models/BadgeToken'
import { FC, useEffect, useState } from 'react'
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
import { scheduleProofGeneration } from 'helpers/callProof'
import { serializeError } from 'eth-rpc-errors'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import EthStore from 'stores/EthStore'
import ProofResponse from 'models/ProofResponse'
import ProofStore from 'stores/ProofStore'
import PublicAccountStore from 'stores/PublicAccountStore'
import TokensStore from 'stores/TokensStore'
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
  waiting = 'The proof generating task is scheduled',
  running = 'The proof is being generated, your position in the queue',
  mint = 'Minting the nft',
  clear = '',
}

const Errors = {
  insufficientFunds: "You don't have enough money on your public address",
  noSignature: "Error getting user's signature",
  invalidProof: 'Merkle Tree Proof is not valid',
  mintError: 'An error occurred while minting your Badge',
  unknown: 'An unknown error occurred, please contact us',
  proofFailed: 'Proof generation failed, please, try again later',
  proofCanceled:
    'Server has reloaded while the proof was being generated, please, try again later',
  clear: '',
}

export const TokenList: FC<{ badge: BadgesEnum }> = ({ badge }) => {
  const { accounts } = useSnapshot(EthStore)
  const { tasks } = useSnapshot(ProofStore)
  const currentTask = tasks[badge]

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

  useEffect(() => {
    async function checkProof(proof: ProofResponse) {
      setLoadingStage(LoadingStage.mint)
      const txResult = await PublicAccountStore.mintDerivative(proof)
      console.log('Tx result', txResult)
      setLoadingMint(false)
      setMinted(true)
    }

    if (currentTask) {
      setLoadingMint(true)
      setError(Errors.clear)

      switch (currentTask.status) {
        case 'success':
          if (!tasks[badge].proof) return
          void checkProof(tasks[badge].proof as ProofResponse)
          delete ProofStore.tasks[badge]
          return
        case 'running':
          setLoadingStage(LoadingStage.running)
          return
        case 'failed':
          delete ProofStore.tasks[badge]
          setError(Errors.invalidProof)
          setLoadingMint(false)
          return
        case 'cancelled':
          delete ProofStore.tasks[badge]
          setError(Errors.proofCanceled)
          setLoadingMint(false)
          return
        default:
          setLoadingStage(LoadingStage.waiting)
          return
      }
    }
  }, [tasks, badge, currentTask])

  return (
    <div className={listWrapper}>
      <div className={listTokenTitle}>
        <BadgeText>Dosu 1 wave invite holder</BadgeText>
        {error ? (
          <ErrorText>{error}</ErrorText>
        ) : (
          <SubBadgeText>
            {loadingStage === LoadingStage.running
              ? `${loadingStage} ${
                  tasks[badge]?.position ? `is #${tasks[badge].position}` : ''
                }`
              : loadingStage}
          </SubBadgeText>
        )}
      </div>

      <div className={listTokenAction}>
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
              console.log('Signature', signature)

              setLoadingStage(LoadingStage.proof)
              const treeProof = await createTreeProof()
              console.log('Merkle proof', treeProof)

              setLoadingStage(LoadingStage.ecdsa)
              const ecdsaInput = await createEcdsaInput()
              console.log('ECDSA input', ecdsaInput)

              setLoadingStage(LoadingStage.output)
              const proof = await scheduleProofGeneration(treeProof, ecdsaInput)
              console.log('Proof', proof)

              setLoadingStage(LoadingStage.waiting)
              const job = { _id: proof._id, status: proof.status }
              console.log('Job: ', job)
              ProofStore.tasks[badge] = { ...job }
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
          disabled={!!EthStore.ethError || minted}
          badge
        >
          {minted ? 'Minted' : 'Mint'}
        </Button>
      </div>
    </div>
  )
}

export default TokenList
