import { AccentText } from 'components/Text'
import { useSnapshot } from 'valtio'
import { useState } from 'react'
import BadgeCard from 'components/badges/BadgeCard'
import BadgeIcon from 'icons/BadgeIcon'
import BadgeWrapper from 'components/badges/BadgeWrapper'
import Button from 'components/Button'
import Complete from 'icons/Complete'
import ContractName from 'components/ContractName'
import ExternalLink from 'components/ExternalLink'
import ProofStore from 'stores/ProofStore'
import QRCode from 'components/QRCode'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import handleError from 'helpers/handleError'
import useBreakpoints from 'hooks/useBreakpoints'

const mintPassed = (small?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    justifyContent(
      small ? 'justify-start' : 'justify-center',
      'lg:justify-center'
    ),
    space('space-x-2'),
    alignItems('items-center')
  )

function Badge({
  contractAddress,
  tokenId,
}: {
  contractAddress: string
  tokenId?: number
}) {
  const { proofsCompleted } = useSnapshot(ProofStore)
  const { reverseLedger } = useSnapshot(SealCredStore)
  const { account } = useSnapshot(WalletStore)

  const { xxs, sm } = useBreakpoints()

  const [loading, setLoading] = useState(false)

  const proof = proofsCompleted.find(
    (proof) => proof.contract === contractAddress
  )

  const small = xxs && !sm
  const ledgerRecord = reverseLedger[contractAddress]
  const derivativeAddress = ledgerRecord?.derivativeContract.address
  const minted = !!derivativeAddress && tokenId !== undefined

  const checkProofAndMint = async () => {
    setLoading(true)

    try {
      if (!account) throw new Error('No account found')
      if (!proof?.result) throw new Error('No proof found')
      await WalletStore.mintDerivative(contractAddress, proof.result)
      ProofStore.proofsCompleted = proofsCompleted.filter(
        (p) => p.contract !== proof.contract && p.result !== proof.result
      )
    } catch (error) {
      if (
        proof &&
        error instanceof Error &&
        error.message.includes('This ZK proof has already been used')
      ) {
        ProofStore.proofsCompleted = proofsCompleted.filter(
          (p) => p.contract !== proof.contract && p.result !== proof.result
        )
        handleError(
          new Error(
            'The ZK proof is invalid. This is a test net bug, please, regenerate the proof.'
          )
        )
      } else {
        handleError(error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <BadgeCard
      top={
        minted ? (
          <QRCode derivativeAddress={derivativeAddress} tokenId={tokenId} />
        ) : (
          <BadgeIcon />
        )
      }
      leanLeft={minted}
      text={
        derivativeAddress ? (
          <ExternalLink url={getEtherscanAddressUrl(derivativeAddress)}>
            <ContractName address={derivativeAddress} />
          </ExternalLink>
        ) : (
          <>
            <ContractName address={contractAddress} /> (derivative)
          </>
        )
      }
      bottom={
        minted ? (
          <div className={mintPassed(small)}>
            <AccentText bold small primary color="text-secondary">
              Minted
            </AccentText>
            <Complete />
          </div>
        ) : (
          <Button
            small
            primary
            loading={!!loading}
            disabled={!proof}
            onClick={checkProofAndMint}
          >
            {proof ? 'Mint badge' : 'Minted!'}
          </Button>
        )
      }
    />
  )
}

export default function ({
  contractAddress,
  tokenId,
}: {
  contractAddress: string
  tokenId?: number
}) {
  return (
    <BadgeWrapper minted={tokenId !== undefined}>
      <Badge contractAddress={contractAddress} tokenId={tokenId} />
    </BadgeWrapper>
  )
}
