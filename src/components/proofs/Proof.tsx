import { AccentText, ProofText } from 'components/Text'
import { DataKeys } from 'models/DataKeys'
import { JSX } from 'preact'
import { useSnapshot } from 'valtio'
import { useState } from 'react'
import BaseProof from 'helpers/proofs/BaseProof'
import Button from 'components/proofs/Button'
import Complete from 'icons/Complete'
import ContractName from 'components/ContractName'
import ExternalLink from 'components/ExternalLink'
import Line from 'components/proofs/Line'
import ProofStore, { generateERC721 } from 'stores/ProofStore'
import Star from 'icons/Star'
import ToolTip from 'components/ToolTip'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  animation,
  cursor,
  display,
  flex,
  flexDirection,
  fontFamily,
  fontSize,
  justifyContent,
  lineHeight,
  maxWidth,
  space,
  width,
} from 'classnames/tailwind'
import data from 'data'
import getEtherscanAddressUrl from 'helpers/network/getEtherscanAddressUrl'
import useBreakpoints from 'hooks/useBreakpoints'

const proofName = classnames(display('flex'), flex('flex-1'))

const proofText = (small?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    space('space-x-2'),
    small ? justifyContent('justify-between') : undefined,
    width(small ? 'w-full' : 'w-fit'),
    maxWidth('max-w-fit'),
    alignItems('items-center'),
    fontFamily('font-primary'),
    lineHeight('leading-5'),
    fontSize('text-sm')
  )

const textWithIcon = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2')
)

function useProofContent(
  dataKey: DataKeys,
  contractAddress: string,
  proof?: BaseProof
): {
  color: 'text-accent' | 'text-secondary' | 'text-tertiary'
  content: JSX.Element | null
} {
  const { account } = useSnapshot(WalletStore)
  const [isGenerating, setIsGenerating] = useState(false)

  if (isGenerating) {
    const powerProofTooltip =
      'Proof generation is a power-hungry process, so don’t sweat if it gets stuck. Your proof will generate if given time.'
    return {
      color: 'text-accent',
      content: (
        <span className={textWithIcon}>
          <ToolTip position="top" fitContainer text={powerProofTooltip}>
            <span className={cursor('cursor-help')}>Generating...</span>
          </ToolTip>
          <div className={animation('animate-spin')}>
            <Star />
          </div>
        </span>
      ),
    }
  }

  if (!proof)
    return {
      color: 'text-tertiary',
      content: (
        <Button
          type="tertiary"
          disabled={isGenerating}
          onClick={async () => {
            setIsGenerating(true)
            await generateERC721(ProofStore[dataKey], contractAddress)
            setIsGenerating(false)
          }}
        >
          Create proof
        </Button>
      ),
    }

  return {
    color: 'text-accent',
    content: (
      <span className={textWithIcon}>
        <span>Proof {proof?.account === account ? 'made' : 'saved'}</span>
        <Complete accent />
      </span>
    ),
  }
}

export default function ({
  proof,
  contractAddress,
  dataKey,
}: {
  proof?: BaseProof
  contractAddress: string
  dataKey: DataKeys
}) {
  const network = data[dataKey].network
  const { xs } = useBreakpoints()
  const { color, content } = useProofContent(dataKey, contractAddress, proof)

  return (
    <Line breakWords>
      <div className={proofName}>
        <ProofText>
          <ExternalLink url={getEtherscanAddressUrl(contractAddress, network)}>
            <ContractName address={contractAddress} network={network} />
          </ExternalLink>
        </ProofText>
      </div>

      <div className={proofText(xs)}>
        <AccentText bold color={color}>
          {content}
        </AccentText>
      </div>
    </Line>
  )
}
