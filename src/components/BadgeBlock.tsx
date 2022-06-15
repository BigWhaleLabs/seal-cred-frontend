import { AccentText, SubheaderText } from 'components/Text'
import { Suspense, useState } from 'react'
import { useSnapshot } from 'valtio'
import BadgeCard from 'components/BadgeCard'
import BadgeIcon from 'icons/BadgeIcon'
import BadgeWrapper from 'components/BadgeWrapper'
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
  const [completed, setCompleted] = useState(false)

  const small = xxs && !sm
  const ledgerRecord = reverseLedger[contractAddress]
  const derivativeAddress = ledgerRecord?.derivativeContract.address
  const minted = !!derivativeAddress && tokenId !== undefined

  const checkProofAndMint = async () => {
    setLoading(true)
    try {
      if (!account) throw new Error('No account found')
      const proof = proofsCompleted.find(
        (proof) => proof.contract === contractAddress
      )
      if (!proof?.result) throw new Error('No proof found')
      await WalletStore.mintDerivative(contractAddress, proof.result)
      ProofStore.proofsCompleted = proofsCompleted.filter(
        (p) => p.contract !== proof.contract && p.result !== proof.result
      )
      setCompleted(true)
    } catch (error) {
      handleError(error)
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
            disabled={completed}
            onClick={checkProofAndMint}
          >
            {completed ? 'Minted!' : 'Mint badge'}
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
