import { ComponentChildren } from 'preact'
import BadgeBlock from 'components/badges/BadgeBlock'
import BadgesOwnedForContract from 'components/badges/BadgesOwnedForContract'
import BaseProof from 'helpers/BaseProof'
import ChildrenProp from 'models/ChildrenProp'
import Section from 'components/Section'
import classnames, {
  display,
  flexGrow,
  gap,
  gridAutoFlow,
  gridAutoRows,
  gridColumnEnd,
  gridColumnStart,
  gridTemplateColumns,
  space,
} from 'classnames/tailwind'
import useAutoAnimate from 'hooks/useAutoAnimate'

const badgesList = classnames(display('flex'))

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
      <div class="container" ref={listRef}>
        {minted.map((contractAddress) => (
          <div class="flex-item">
            <BadgesOwnedForContract
              key={contractAddress}
              contractAddress={contractAddress}
            />
          </div>
        ))}
        {proofs.map((proof) => (
          <div class="flex-item">
            <BadgeBlock onMinted={onMinted} key={proof.key} proof={proof} />
          </div>
        ))}
      </div>
    </Section>
  )
}
