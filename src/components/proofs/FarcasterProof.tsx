import { ProofText } from 'components/ui/Text'
import { useState } from 'preact/hooks'
import FarcasterProofForm from 'components/proofs/FarcasterProofForm'
import Line from 'components/ui/Line'
import classnames, {
  alignItems,
  display,
  fontWeight,
  justifyContent,
  space,
  width,
} from 'classnames/tailwind'

const emailTitleContainer = classnames(
  display('flex'),
  justifyContent('justify-between'),
  alignItems('items-center')
)

const proofLineContainer = classnames(
  space('space-y-2'),
  fontWeight('font-normal'),
  width('w-full')
)

const emailTitleLeft = classnames(
  display('flex'),
  space('space-x-3'),
  alignItems('items-center')
)

export default function () {
  const [error, setError] = useState<string | undefined>()

  return (
    <Line breakWords>
      <div className={proofLineContainer}>
        <div className={emailTitleContainer}>
          <div className={emailTitleLeft}>
            <ProofText>Farcaster username</ProofText>
          </div>
        </div>
        <FarcasterProofForm
          submitType="secondary"
          onError={setError}
          error={error}
        />
      </div>
    </Line>
  )
}
