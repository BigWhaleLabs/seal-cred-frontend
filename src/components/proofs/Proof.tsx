import { AccentText, ProofText } from 'components/Text'
import { JSX } from 'preact'
import { useSnapshot } from 'valtio'
import { useState } from 'react'
import Button from 'components/proofs/Button'
import Complete from 'icons/Complete'
import ContractName from 'components/ContractName'
import ERC721Proof from 'helpers/ERC721Proof'
import ExternalLink from 'components/ExternalLink'
import Line from 'components/proofs/Line'
import Network from 'models/Network'
import ProofStore from 'stores/ProofStore'
import Star from 'icons/Star'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  animation,
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
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
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
  contractAddress: string,
  network: Network,
  proof?: ERC721Proof
): {
  color: 'text-accent' | 'text-secondary' | 'text-tertiary'
  content: JSX.Element | null
} {
  const { account } = useSnapshot(WalletStore)
  const [isGenerating, setIsGenerating] = useState(false)

  if (isGenerating)
    return {
      color: 'text-accent',
      content: (
        <span className={textWithIcon}>
          <span>Generating...</span>
          <div className={animation('animate-spin')}>
            <Star />
          </div>
        </span>
      ),
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
            await ProofStore.generateERC721(contractAddress, network)
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
        <span>Proof {proof.account === account ? 'made' : 'saved'}</span>
        <Complete accent />
      </span>
    ),
  }
}

export default function ({
  proof,
  contractAddress,
  network,
}: {
  proof?: ERC721Proof
  contractAddress: string
  network: Network
}) {
  const { xs } = useBreakpoints()
  const { color, content } = useProofContent(contractAddress, network, proof)

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
