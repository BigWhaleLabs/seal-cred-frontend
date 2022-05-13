import { AccentText } from 'components/Text'
import { FC } from 'react'
import { useSnapshot } from 'valtio'
import Complete from 'icons/Complete'
import ContractName from 'components/ContractName'
import Proof from 'models/Proof'
import ProofLine from 'components/ProofLine'
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
import useBreakpoints from 'helpers/useBreakpoints'

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
  proof: Proof
): ['text-green' | 'text-yellow' | 'text-pink', JSX.Element | null] {
  const { account } = useSnapshot(WalletStore)
  if (proof.status === 'running')
    return [
      'text-yellow',
      <span className={textWithIcon}>
        <span>Generating...</span>
        <div className={animation('animate-spin')}>
          <Star />
        </div>
      </span>,
    ]
  if (proof.status === 'scheduled')
    return [
      'text-pink',
      <>
        {proof.position !== undefined
          ? `Queued with position: ${proof?.position + 1}`
          : 'Queued'}
      </>,
    ]
  return [
    'text-yellow',
    <span className={textWithIcon}>
      <span>Proof {proof.account === account ? 'made' : 'saved'}</span>
      <Complete color="yellow" />
    </span>,
  ]
}

const ZKProof: FC<{ proof: Proof }> = ({ proof }) => {
  const { xs, mobile } = useBreakpoints()
  const [color, content] = useProofContent(proof)

  return (
    <ProofLine>
      <ContractName address={proof.contract} truncate={xs} overflow />
      <div className={proofText(mobile)}>
        <AccentText bold color={color}>
          {content}
        </AccentText>
      </div>
    </ProofLine>
  )
}

export default ZKProof
