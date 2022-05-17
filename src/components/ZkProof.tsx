import { AccentText } from 'components/Text'
import { useSnapshot } from 'valtio'
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
    lineHeight('leading-5')
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

  if (!proof) {
    return {
      color: 'text-tertiary',
      content: (
        <ProofButton
          color="tertiary"
          onClick={() => {
            void ProofStore.generate(contractAddress)
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
        <Complete color="accent" />
      </span>
    ),
  }
}

interface ZkProofProps {
  proof?: Proof
  contractAddress: string
}
export default function ({ proof, contractAddress }: ZkProofProps) {
  const { xxs, xs } = useBreakpoints()
  const { color, content } = useProofContent(contractAddress, proof)

  return (
    <ProofLine>
      <ContractName address={contractAddress} truncate={xxs} overflow />
      <div className={proofText(xs)}>
        <AccentText bold color={color}>
          {content}
        </AccentText>
      </div>
    </ProofLine>
  )
}