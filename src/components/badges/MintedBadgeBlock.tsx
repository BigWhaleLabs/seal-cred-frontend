import { AccentText } from 'components/Text'
import BadgeCard from 'components/badges/BadgeCard'
import BadgeTitle from 'components/badges/BadgeTitle'
import BadgeWrapper from 'components/badges/BadgeWrapper'
import Complete from 'icons/Complete'
import Network from 'models/Network'
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
  network,
}: {
  derivativeAddress: string
  tokenId: number
  network?: Network
}) {
  const { xxs, sm } = useBreakpoints()
  const small = xxs && !sm

  return (
    <BadgeCard
      top={<QRCode derivativeAddress={derivativeAddress} tokenId={tokenId} />}
      text={
        <BadgeTitle derivativeAddress={derivativeAddress} network={network} />
      }
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
  network,
}: {
  derivativeAddress: string
  tokenId: number
  network?: Network
}) {
  return (
    <BadgeWrapper minted={tokenId !== undefined}>
      <Badge
        derivativeAddress={derivativeAddress}
        tokenId={tokenId}
        network={network}
      />
    </BadgeWrapper>
  )
}
