import { BodyText } from 'components/Text'
import { ComponentChildren } from 'preact'
import { useSnapshot } from 'valtio'
import BadgeBlock from 'components/badges/BadgeBlock'
import BadgesOwnedForContract from 'components/badges/BadgesOwnedForContract'
import BaseProof from 'helpers/BaseProof'
import Button from 'components/Button'
import ChildrenProp from 'models/ChildrenProp'
import Section from 'components/Section'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  gap,
  gridAutoRows,
  gridColumn,
  gridTemplateColumns,
  padding,
} from 'classnames/tailwind'
import shareToTwitter from 'helpers/shareToTwitter'

const badgesList = classnames(
  display('grid'),
  gap('gap-2'),
  gridAutoRows('auto-rows-auto'),
  gridTemplateColumns('grid-cols-1', 'lg:grid-cols-2')
)
const wideBlock = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  borderRadius('rounded-lg'),
  backgroundColor('bg-primary-dimmed'),
  padding('lg:px-6', 'px-4', 'py-4'),
  gridColumn('lg:col-span-2', 'col-span-1')
)

export default function ({
  title,
  minted,
  proofs,
}: ChildrenProp & {
  title?: ComponentChildren
  minted: string[]
  proofs: BaseProof[]
}) {
  if (minted.length === 0 && proofs.length === 0) return null
  const { firstBadge } = useSnapshot(WalletStore)

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
          <BadgeBlock
            onMinted={() => (WalletStore.firstBadge.minted = true)}
            key={proof.key}
            proof={proof}
          />
        ))}
        {firstBadge.minted && !firstBadge.notified && (
          <div className={wideBlock}>
            <BodyText bold fontPrimary>
              You minted your first badge!
            </BodyText>
            <Button
              type="secondary"
              onClick={() => {
                WalletStore.firstBadge.notified = true
                shareToTwitter({
                  text: 'Create zero knowledge proof and build your pseudonymous wallet with SealCred 🦭 sealcred.xyz',
                })
              }}
              textMaxWidth
              small
            >
              Share a Tweet
            </Button>
          </div>
        )}
      </div>
    </Section>
  )
}
