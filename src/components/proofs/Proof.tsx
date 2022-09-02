import { AccentText, ProofText } from 'components/ui/Text'
import { DataKey } from 'models/DataKey'
import { JSX } from 'preact'
import { useSnapshot } from 'valtio'
import Complete from 'icons/Complete'
import Line from 'components/ui/Line'
import ProofButton from 'components/proofs/ProofButton'
import ProofModel from 'models/Proof'
import ProofStore from 'stores/ProofStore'
import ProofTitle from 'components/proofs/ProofTitle'
import Star from 'icons/Star'
import ToolTip from 'components/ui/ToolTip'
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
  wordBreak,
} from 'classnames/tailwind'

const proofName = classnames(
  display('flex'),
  flex('flex-1'),
  wordBreak('break-words')
)

const proofText = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2'),
  justifyContent('justify-start', 'xs:justify-between'),
  width('w-full', 'xs:w-fit'),
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
  type: DataKey,
  original: string,
  onCreate?: () => Promise<void>,
  proof?: ProofModel
): {
  color: 'text-accent' | 'text-secondary' | 'text-tertiary'
  content: JSX.Element | null
} {
  const store = ProofStore[type]
  const { progressing } = useSnapshot(store)
  const { account } = useSnapshot(WalletStore)

  const isGenerating = progressing[original]

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

  if (!proof && onCreate)
    return {
      color: 'text-tertiary',
      content: (
        <ProofButton
          type="tertiary"
          disabled={isGenerating}
          onClick={async () => {
            store.progressing[original] = true
            try {
              await onCreate()
            } finally {
              store.progressing[original] = false
            }
          }}
        >
          Create proof
        </ProofButton>
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
  type,
  proof,
  original,
  onCreate,
}: {
  type: DataKey
  original: string
  proof?: ProofModel
  onCreate?: () => Promise<void>
}) {
  const { color, content } = useProofContent(type, original, onCreate, proof)

  return (
    <Line breakWords>
      <div className={proofName}>
        <ProofText>
          <ProofTitle type={type} original={original} />
        </ProofText>
      </div>

      <div className={proofText}>
        <AccentText bold color={color}>
          {content}
        </AccentText>
      </div>
    </Line>
  )
}
