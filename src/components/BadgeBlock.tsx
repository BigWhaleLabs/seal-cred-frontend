import { BadgeText, BoldColoredText, SubheaderText } from 'components/Text'
import { BigNumber } from 'ethers'
import { Suspense, useState } from 'react'
import { handleError } from 'helpers/handleError'
import { useSnapshot } from 'valtio'
import BadgeIcon from 'icons/BadgeIcon'
import Button from 'components/Button'
import Complete from 'icons/Complete'
import ContractName from 'components/ContractName'
import ProofStore from 'stores/ProofStore'
import QRCode from 'components/QRCode'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  justifyContent,
  padding,
  space,
  textAlign,
} from 'classnames/tailwind'
import sealCred from 'helpers/sealCred'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useBreakpoints from 'helpers/useBreakpoints'

const badgeWrapper = (minted: boolean, small?: boolean) =>
  classnames(
    display('flex'),
    flexDirection(
      minted ? (small ? 'flex-col' : 'flex-row') : 'flex-col',
      'lg:flex-col'
    ),
    justifyContent(minted ? 'justify-start' : 'justify-center'),
    alignItems('items-center'),
    borderRadius('rounded-lg'),
    backgroundColor(minted ? 'bg-blue-700' : 'bg-blue-800'),
    padding('px-4', 'py-4'),
    space(
      minted ? (small ? 'space-y-2' : 'space-x-2') : 'space-y-2',
      minted ? 'lg:space-x-0' : undefined,
      'lg:space-y-2'
    )
  )

const badgeBody = (minted?: boolean, small?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    space('space-y-2'),
    textAlign(
      minted ? (small ? 'text-center' : 'text-left') : 'text-center',
      'lg:text-center'
    ),
    alignItems(
      minted ? (small ? 'items-center' : 'items-start') : 'items-center',
      'lg:items-center'
    ),
    justifyContent(
      minted ? (small ? 'justify-center' : 'justify-start') : 'justify-center',
      'lg:justify-center'
    )
  )

const mintPassed = (small?: boolean) =>
  classnames(
    display('flex'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    justifyContent(
      small ? 'justify-start' : 'justify-center',
      'lg:justify-center'
    ),
    flexDirection('flex-row'),
    space('space-x-2')
  )

function Badge({
  contractAddress,
  tokenId,
}: {
  contractAddress: string
  tokenId?: number
}) {
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { ledger } = useSnapshot(SealCredStore)
  const { account } = useSnapshot(WalletStore)

  const { xs, sm } = useBreakpoints()

  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)

  const small = xs && !sm
  const minted = tokenId !== undefined
  const ledgerRecord = ledger[contractAddress]
  const derivativeAddress = ledgerRecord.derivativeContract.address

  return (
    <>
      {minted ? (
        <QRCode derivativeAddress={derivativeAddress} tokenId={tokenId} />
      ) : (
        <BadgeIcon color="pink" />
      )}
      <div className={badgeBody(minted, small)}>
        <BadgeText>
          <ContractName address={derivativeAddress} />
        </BadgeText>
        {minted && (
          <div className={mintPassed(small)}>
            <BoldColoredText color="text-pink">Minted</BoldColoredText>
            <Complete color="pink" />
          </div>
        )}
        {!minted && (
          <Button
            small
            colors="primary"
            loading={!!loading}
            disabled={completed}
            onClick={async () => {
              setLoading(true)
              try {
                if (!account) throw new Error('No account found')
                const proof = proofsCompleted.find(
                  (proof) => proof.contract === contractAddress
                )
                if (!proof || !proof.result) throw new Error('No proof found')
                const ledgerMerkleTree = await sealCred.getRoot(contractAddress)
                if (
                  !BigNumber.from(ledgerMerkleTree).eq(
                    BigNumber.from(proof.result.publicSignals[1])
                  )
                ) {
                  const index = ProofStore.proofsCompleted.findIndex(
                    (p) => p.contract === proof.contract
                  )
                  if (index > -1) ProofStore.proofsCompleted.splice(index, 1)

                  throw new Error(
                    'This proof is outdated, please, generate a new one'
                  )
                }
                await WalletStore.mintDerivative(
                  derivativeAddress,
                  proof.result
                )
                setCompleted(true)
              } catch (error) {
                handleError(error)
              } finally {
                setLoading(false)
              }
            }}
          >
            {completed ? 'Minted!' : 'Mint badge'}
          </Button>
        )}
      </div>
    </>
  )
}

function BadgeBlock({
  contractAddress,
  tokenId,
}: {
  contractAddress: string
  tokenId?: number
}) {
  const { xs, sm } = useBreakpoints()
  const shortAddress = truncateMiddleIfNeeded(contractAddress, 11)

  return (
    <div className={badgeWrapper(tokenId !== undefined, xs && !sm)}>
      <Suspense fallback={<SubheaderText>{shortAddress}...</SubheaderText>}>
        <Badge contractAddress={contractAddress} tokenId={tokenId} />
      </Suspense>
    </div>
  )
}

export default BadgeBlock
