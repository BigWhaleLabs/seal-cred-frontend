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
import { callProof } from 'helpers/callProof'
import { serializeError } from 'eth-rpc-errors'
import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import EthStore from 'stores/EthStore'
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
  waiting = 'Waiting the proof to be verified',
  mint = 'Minting the nft',
  clear = '',
}

const Errors = {
  insufficientFunds: "You don't have enough money on your public address",
  noSignature: "Error getting user's signature",
  invalidProof: 'Merkle Tree Proof is not valid',
  mintError: 'An error occurred while minting your Badge',
  unknown: 'An unknown error occurred, please contact us',
  proofFailed: 'Proof failed for some reason. Try again later',
  proofCanceled: 'Server temporary error. The job was canceled',
  clear: '',
}

export const TokenList = () => {
  const { accounts } = useSnapshot(EthStore)
  const { jobs } = useSnapshot(ProofStore)

  const [loadingMint, setLoadingMint] = useState(false)
  const [loadingStage, setLoadingStage] = useState<LoadingStage>(
    LoadingStage.clear
  )
  const [error, setError] = useState<string>(Errors.clear)
  const [minted, setMinted] = useState(false)

  const checkingProof = async (address: string) => {
    try {
      const data = await ProofStore.checkJobStatus(jobs[address].job._id)
      const { status, _id, proof, input } = data.job
      return {
        position: data.position,
        job: { _id, status, proof, input },
      }
    } catch (error) {
      setLoadingStage(LoadingStage.clear)
      setLoadingMint(false)
      ProofStore.removeJob(address)
      switch (error) {
        case 'failed':
          setError(Errors.invalidProof)
          return null
        case 'cancelled':
          setError(Errors.proofCanceled)
          return null
        default:
          setError(Errors.unknown)
          return null
      }
    }
  }

  useEffect(() => {
    async function checkMinted() {
      const result = await TokensStore.checkInviteToken(accounts[0])
      setMinted(!!result.dosu1wave)
    }

    void checkMinted()
  }, [accounts])

  useEffect(() => {
    function checkJob() {
      const jobKeys = Object.keys(jobs)
      const job = jobKeys.find((job) => job === accounts[0])
      if (!job) return

      setLoadingMint(true)
      setLoadingStage(LoadingStage.waiting)
      setError(Errors.clear)

      const interval = setInterval(async () => {
        const result = await checkingProof(job)
        if (result) {
          ProofStore.jobs[job] = result
          if (result?.job.status === 'success' && result.job.proof) {
            ProofStore.removeJob(job)
            setLoadingStage(LoadingStage.mint)
            const txResult = await PublicAccountStore.mintDerivative(
              result.job.proof
            )
            console.log('Tx result', txResult)
            setMinted(true)
          }
        }
        if (!result || result.job.status === 'success') clearInterval(interval)
      }, 5000)
      if (Object.keys(jobs).length === 0) clearInterval(interval)
    }

    void checkJob()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs])

  return (
    <div className={listWrapper}>
      <div className={listTokenTitle}>
        <BadgeText>Dosu 1 wave invite holder</BadgeText>
        {error ? (
          <ErrorText>{error}</ErrorText>
        ) : (
          <SubBadgeText>
            {loadingStage === LoadingStage.waiting
              ? `${loadingStage} (You're ${
                  jobs[accounts[0]]?.position || ''
                } in queue)`
              : loadingStage}
          </SubBadgeText>
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
                console.log('Signature', signature)

                setLoadingStage(LoadingStage.proof)
                const treeProof = await createTreeProof()
                console.log('Merkle proof', treeProof)

                setLoadingStage(LoadingStage.ecdsa)
                const ecdsaInput = await createEcdsaInput()
                console.log('ECDSA input', ecdsaInput)

                setLoadingStage(LoadingStage.output)
                const proof = await callProof(treeProof, ecdsaInput)
                console.log('Proof', proof)

                setLoadingStage(LoadingStage.waiting)
                const job = { _id: proof._id, status: proof.status }
                ProofStore.addNewJob(EthStore.accounts[0], { job })
              } catch (error) {
                console.error('Token list error: ', error)

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
