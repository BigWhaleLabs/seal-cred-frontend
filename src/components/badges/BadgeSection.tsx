import { ComponentChildren } from 'preact'
import BadgeBlock from 'components/badges/BadgeBlock'
import BadgesOwnedForContract from 'components/badges/BadgesOwnedForContract'
import ChildrenProp from 'models/ChildrenProp'
import Proof from 'models/Proof'
import Section from 'components/ui/Section'
import classnames, {
  display,
  gap,
  gridAutoRows,
  gridTemplateColumns,
} from 'classnames/tailwind'

const badgesList = classnames(
  display('grid'),
  gap('gap-2'),
  gridAutoRows('auto-rows-auto'),
  gridTemplateColumns('grid-cols-1', 'sm:grid-cols-2', 'xl:!grid-cols-6')
)

export default function ({
  minted,
  onMinted,
  proofs,
  title,
}: ChildrenProp & {
  title?: ComponentChildren
  minted: string[]
  proofs: Proof[]
  onMinted?: () => void
}) {
  if (minted.length === 0 && proofs.length === 0) return null

  return (
    <Section title={title}>
      <div className={badgesList}>
        {minted.map((contractAddress) => (
          <BadgesOwnedForContract
            contractAddress={contractAddress}
            key={contractAddress}
          />
        ))}
        {proofs.map((proof) => (
          <BadgeBlock key={proof.original} proof={proof} onMinted={onMinted} />
        ))}
      </div>
    </Section>
  )
}
