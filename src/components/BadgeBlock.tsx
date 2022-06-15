import { AccentText, BadgeText, SubheaderText } from 'components/Text'
import { Suspense, useState } from 'react'
import { useSnapshot } from 'valtio'
import BadgeIcon from 'icons/BadgeIcon'
import Button from 'components/Button'
import Complete from 'icons/Complete'
import ContractName from 'components/ContractName'
import ExternalLink from 'components/ExternalLink'
import ProofStore from 'stores/ProofStore'
import QRCode from 'components/QRCode'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  justifyContent,
  maxWidth,
  padding,
  space,
  textAlign,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import handleError from 'helpers/handleError'
import useBreakpoints from 'hooks/useBreakpoints'

const badgeWrapper = (minted: boolean, small?: boolean) =>
  classnames(
    display('flex'),
    flexDirection(
      minted ? (small ? 'flex-col' : 'flex-row') : 'flex-col',
      'lg:flex-col'
    ),
    justifyContent(minted ? 'justify-start' : 'justify-center'),
    space(
      minted ? (small ? 'space-y-2' : 'space-x-2') : 'space-y-2',
      minted ? 'lg:space-x-0' : undefined,
      'lg:space-y-2'
    ),
    alignItems('items-center'),
    borderRadius('rounded-lg'),
    backgroundColor(minted ? 'bg-primary-dimmed' : 'bg-primary-background'),
    padding('px-4', 'py-4')
  )

const badgeBody = (minted?: boolean, small?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    justifyContent(
      minted ? (small ? 'justify-center' : 'justify-start') : 'justify-center',
      'lg:justify-center'
    ),
    space('space-y-2'),
    alignItems(
      minted ? (small ? 'items-center' : 'items-start') : 'items-center',
      'lg:items-center'
    ),
    textAlign(
      minted ? (small ? 'text-center' : 'text-left') : 'text-center',
      'lg:text-center'
    )
  )

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
const badgeBlockName = (small?: boolean) =>
  small ? classNamesToString(maxWidth('max-w-100'), 'line-clamp-2') : undefined

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

  const { xxs, sm, iPhoneSizes } = useBreakpoints()

  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)

  const small = xxs && !sm
  const ledgerRecord = ledger[contractAddress]
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
    <>
      {minted ? (
        <QRCode derivativeAddress={derivativeAddress} tokenId={tokenId} />
      ) : (
        <BadgeIcon />
      )}
      <div className={badgeBody(minted, small)}>
        <div className={badgeBlockName(iPhoneSizes)}>
          <BadgeText small>
            {derivativeAddress ? (
              <ExternalLink url={getEtherscanAddressUrl(derivativeAddress)}>
                <ContractName address={derivativeAddress} />
              </ExternalLink>
            ) : (
              <>
                <ContractName address={contractAddress} /> (derivative)
              </>
            )}
          </BadgeText>
        </div>
        {minted ? (
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
        )}
      </div>
    </>
  )
}

export default function ({
  contractAddress,
  tokenId,
}: {
  contractAddress: string
  tokenId?: number
}) {
  const { xxs, sm } = useBreakpoints()

  return (
    <div className={badgeWrapper(tokenId !== undefined, xxs && !sm)}>
      <Suspense
        fallback={
          <SubheaderText>
            <ContractName address={contractAddress} />
            ...
          </SubheaderText>
        }
      >
        <Badge contractAddress={contractAddress} tokenId={tokenId} />
      </Suspense>
    </div>
  )
}
