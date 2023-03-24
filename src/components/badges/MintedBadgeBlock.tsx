import { AccentText } from 'components/ui/Text'
import BadgeCard from 'components/badges/BadgeCard'
import BadgeTitle from 'components/badges/BadgeTitle'
import BadgeWrapper from 'components/badges/BadgeWrapper'
import Complete from 'icons/Complete'
import QRCode from 'components/ui/QRCode'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  position,
  space,
} from 'classnames/tailwind'

const mintPassed = classnames(
  display('flex'),
  position('relative'),
  flexDirection('flex-row'),
  justifyContent('justify-start', 'sm:justify-center'),
  space('space-x-2'),
  alignItems('items-center')
)

function Badge({
  derivativeAddress,
  tokenId,
}: {
  derivativeAddress: string
  tokenId: number
}) {
  return (
    <BadgeCard
      text={<BadgeTitle clearType originalOrAddress={derivativeAddress} />}
      top={<QRCode derivativeAddress={derivativeAddress} tokenId={tokenId} />}
      bottom={
        <div className={mintPassed}>
          <AccentText bold primary small color="text-secondary">
            Minted
          </AccentText>
          <Complete />
        </div>
      }
    />
  )
}

export default function ({
  derivativeAddress,
  tokenId,
}: {
  derivativeAddress: string
  tokenId: number
}) {
  return (
    <BadgeWrapper minted={tokenId !== undefined}>
      <Badge derivativeAddress={derivativeAddress} tokenId={tokenId} />
    </BadgeWrapper>
  )
}
