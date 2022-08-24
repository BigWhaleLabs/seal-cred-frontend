import { DataKeys } from 'models/DataKeys'
import { HintText } from 'components/ui/Text'
import BaseProof from 'helpers/proofs/BaseProof'
import HintCard from 'components/badges/HintCard'
import Proof from 'components/proofs/Proof'
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
  proofs: BaseProof[]
  dataKey: DataKeys
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
      {(Array.from(proofs) as BaseProof[])
        .sort((a, b) => (a.account === b.account ? 0 : -1))
        .map((proof) => (
          <Proof
            key={`${proof.origin}-${proof.account}`}
            type={dataKey}
            original={proof.origin}
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
