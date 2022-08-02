import { ComponentChildren } from 'preact'
import BadgeBlock from 'components/badges/BadgeBlock'
import BadgesOwnedForContract from 'components/badges/BadgesOwnedForContract'
import BaseProof from 'helpers/BaseProof'
import ChildrenProp from 'models/ChildrenProp'
import Section from 'components/Section'
import classnames, {
  display,
  gap,
  gridAutoRows,
  gridTemplateColumns,
} from 'classnames/tailwind'
import useAutoAnimate from 'hooks/useAutoAnimate'

const badgesList = classnames(
  display('grid'),
  gap('gap-2'),
  gridAutoRows('auto-rows-auto'),
  gridTemplateColumns('grid-cols-1', 'lg:grid-cols-2')
)

export default function ({
  title,
  minted,
  proofs,
  onMinted,
}: ChildrenProp & {
  title?: ComponentChildren
  minted: string[]
  proofs: BaseProof[]
  onMinted?: () => void
}) {
  const [listRef] = useAutoAnimate<HTMLDivElement>()
  if (minted.length === 0 && proofs.length === 0) return null

  return (
    <Section title={title}>
      <div className={badgesList} ref={listRef}>
        {minted.map((contractAddress) => (
          <BadgesOwnedForContract
            key={contractAddress}
            contractAddress={contractAddress}
          />
        ))}
        {proofs.map((proof) => (
          <BadgeBlock onMinted={onMinted} key={proof.key} proof={proof} />
        ))}
      </div>
    </Section>
  )
}
