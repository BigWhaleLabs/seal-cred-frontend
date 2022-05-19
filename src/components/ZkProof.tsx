import { AccentText, BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import { useState } from 'react'
import Complete from 'icons/Complete'
import ContractName from 'components/ContractName'
import Proof from 'models/Proof'
import ProofButton from 'components/ProofButton'
import ProofLine from 'components/ProofLine'
import ProofStore from 'stores/ProofStore'
import Star from 'icons/Star'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  animation,
  display,
  flexDirection,
  fontFamily,
  fontSize,
  justifyContent,
  lineHeight,
  maxWidth,
  space,
  width,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

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
  proof?: Proof
): {
  color: 'text-accent' | 'text-secondary' | 'text-tertiary'
  content: JSX.Element | null
} {
  const { account } = useSnapshot(WalletStore)
  const [isGenerating, setIsGenerating] = useState(false)

  if (!proof) {
    return {
      color: 'text-tertiary',
      content: (
        <ProofButton
          disabled={isGenerating}
          onClick={async () => {
            setIsGenerating(true)
            await ProofStore.generate(contractAddress)
            setIsGenerating(false)
          }}
        >
          Create proof
        </ProofButton>
      ),
    }
  }

  if (proof.status === 'running')
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

  if (proof.status === 'scheduled')
    return {
      color: 'text-secondary',
      content: (
        <>
          {proof.position !== undefined
            ? `Queued with position: ${proof?.position + 1}`
            : 'Queued'}
        </>
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
}: {
  proof?: Proof
  contractAddress: string
}) {
  const { xs } = useBreakpoints()
  const { color, content } = useProofContent(contractAddress, proof)

  return (
    <ProofLine>
      <BodyText bold small>
        <ContractName address={contractAddress} />
      </BodyText>

      <div className={proofText(xs)}>
        <AccentText bold color={color}>
          {content}
        </AccentText>
      </div>
    </ProofLine>
  )
}
