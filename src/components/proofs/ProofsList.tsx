import { DataKey } from 'models/DataKey'
import { HintText } from 'components/ui/Text'
import HintCard from 'components/badges/HintCard'
import Proof from 'components/proofs/Proof'
import ProofModel from 'models/Proof'
import classnames, { display, flexDirection, space } from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-2')
)

export default function ({
  dataKey,
  onCreate,
  proofs,
  originals,
  nothingToGenerateText,
}: {
  originals?: string[]
  proofs: ProofModel[]
  dataKey: DataKey
  onCreate?: (original: string) => Promise<void>
  nothingToGenerateText?: string
}) {
  if (proofs.length === 0 && originals?.length === 0) {
    return nothingToGenerateText ? (
      <HintCard small marginY={false}>
        <HintText bold center>
          {nothingToGenerateText}
        </HintText>
      </HintCard>
    ) : null
  }

  return (
    <div className={container}>
      {Array.from(proofs)
        .sort((a, b) => (a.account === b.account ? 0 : -1))
        .map((proof) => (
          <Proof
            key={`${proof.original}-${proof.account}`}
            type={dataKey}
            original={proof.original}
            proof={proof}
          />
        ))}
      {onCreate &&
        originals?.map((original) => (
          <Proof
            key={original}
            type={dataKey}
            original={original}
            onCreate={() => onCreate(original)}
          />
        ))}
    </div>
  )
}