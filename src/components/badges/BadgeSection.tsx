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
  title,
  minted,
  proofs,
  onMinted,
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
            key={contractAddress}
            contractAddress={contractAddress}
          />
        ))}
        {proofs.map((proof) => (
          <BadgeBlock onMinted={onMinted} key={proof.original} proof={proof} />
        ))}
      </div>
    </Section>
  )
}
