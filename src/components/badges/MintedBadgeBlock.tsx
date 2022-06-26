import { AccentText } from 'components/Text'
import BadgeCard from 'components/badges/BadgeCard'
import BadgeTitle from 'components/badges/BadgeTitle'
import BadgeWrapper from 'components/badges/BadgeWrapper'
import Complete from 'icons/Complete'
import QRCode from 'components/QRCode'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const mintPassed = (small?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    justifyContent(
      small ? 'justify-start' : 'justify-center',
      'lg:justify-center'
    ),
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
  const { xxs, sm } = useBreakpoints()
  const small = xxs && !sm

  return (
    <BadgeCard
      top={<QRCode derivativeAddress={derivativeAddress} tokenId={tokenId} />}
      leanLeft
      text={<BadgeTitle derivativeAddress={derivativeAddress} />}
      bottom={
        <div className={mintPassed(small)}>
          <AccentText bold small primary color="text-secondary">
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
