import { ComponentChildren } from 'preact'
import BadgeBlock from 'components/badges/BadgeBlock'
import BadgesOwnedForContract from 'components/badges/BadgesOwnedForContract'
import BaseProof from 'helpers/BaseProof'
import ChildrenProp from 'models/ChildrenProp'
import Section from 'components/Section'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  boxSizing,
  display,
  flexGrow,
  flexWrap,
  height,
  margin,
  width,
} from 'classnames/tailwind'
import useAutoAnimate from 'hooks/useAutoAnimate'

const badgesList = classnames(
  display('flex'),
  flexWrap('flex-wrap'),
  boxSizing('box-border')
)

const badgeWrapper = classnames(
  height('h-auto'),
  flexGrow('grow'),
  margin('my-1', 'mr-1.5'),
  width('md:w-card-with-gaps', 'w-full')
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
          <div className={classNamesToString(badgeWrapper)}>
            <BadgesOwnedForContract
              key={contractAddress}
              contractAddress={contractAddress}
            />
          </div>
        ))}
        {proofs.map((proof) => (
          <div className={classNamesToString(badgeWrapper)}>
            <BadgeBlock onMinted={onMinted} key={proof.key} proof={proof} />
          </div>
        ))}
      </div>
    </Section>
  )
}
