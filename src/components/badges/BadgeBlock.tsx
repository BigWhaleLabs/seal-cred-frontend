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
import workProofStore from 'stores/WorkProofStore'

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
  domain,
}: {
  contractAddress?: string
  domain?: string
  tokenId?: number
}) {
  const { proofsCompleted: ERC721Proofs } = useSnapshot(ProofStore)
  const { proofsCompleted: WorkProofs } = useSnapshot(workProofStore)
  const { reverseErc721Ledger } = useSnapshot(SealCredStore)
  const { account } = useSnapshot(WalletStore)

  const { xxs, sm } = useBreakpoints()

  const [loading, setLoading] = useState(false)

  const proof = domain
    ? WorkProofs.find((proof) => proof.domain === domain)
    : ERC721Proofs.find((proof) => proof.contract === contractAddress)

  const small = xxs && !sm

  // TODO
  const ledgerRecord = contractAddress
    ? reverseErc721Ledger[contractAddress]
    : null // TODO reverseWorkLedger[domain]
  const derivativeAddress = ledgerRecord?.derivativeContract.address
  const minted = !!derivativeAddress && tokenId !== undefined

  const checkProofAndMint = async () => {
    setLoading(true)

    try {
      if (!account) throw new Error('No account found')
      if (!proof?.result) throw new Error('No proof found')
      domain
        ? await WalletStore.mintDerivative(proof.result, undefined, domain)
        : await WalletStore.mintDerivative(
            proof.result,
            contractAddress,
            undefined
          )

      ProofStore.proofsCompleted = ERC721Proofs.filter(
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
            <ContractName address={contractAddress || domain} /> (derivative)
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
            type="primary"
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
  domain,
  tokenId,
}: {
  contractAddress?: string
  domain?: string
  tokenId?: number
}) {
  return (
    <BadgeWrapper minted={tokenId !== undefined}>
      <Badge
        contractAddress={contractAddress}
        tokenId={tokenId}
        domain={domain}
      />
    </BadgeWrapper>
  )
}
