import { AccentText, ProofText } from 'components/Text'
import Complete from 'icons/Complete'
import EmailProof from 'helpers/EmailProof'
import Line from 'components/proofs/Line'
import classnames, {
  alignItems,
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

const proofName = classnames(display('flex'), flex('flex-1'))

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

export default function ({ proof }: { proof: EmailProof }) {
  return (
    <Line>
      <div className={proofName}>
        <ProofText>@{proof.domain}</ProofText>
      </div>

      <div className={proofText}>
        <AccentText bold color="text-accent">
          <span className={textWithIcon}>
            <span>Proof saved</span>
            <Complete accent />
          </span>
        </AccentText>
      </div>
    </Line>
  )
}
