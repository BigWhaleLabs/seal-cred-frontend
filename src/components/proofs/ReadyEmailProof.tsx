import { AccentText, BodyText } from 'components/Text'
import Complete from 'icons/Complete'
import EmailProof from 'helpers/EmailProof'
import Line from 'components/proofs/Line'
import classnames, {
  alignItems,
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

export default function ({ proof }: { proof: EmailProof }) {
  const { xs } = useBreakpoints()

  return (
    <Line>
      <BodyText bold small>
        {proof.domain}
      </BodyText>

      <div className={proofText(xs)}>
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
