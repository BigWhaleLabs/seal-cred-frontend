import { AccentText } from 'components/Text'
import BadgeCard from 'components/badges/BadgeCard'
import BadgeWrapper from 'components/badges/BadgeWrapper'
import Complete from 'icons/Complete'
import ContractName from 'components/ContractName'
import ExternalLink from 'components/ExternalLink'
import QRCode from 'components/QRCode'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
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
      text={
        derivativeAddress ? (
          <ExternalLink url={getEtherscanAddressUrl(derivativeAddress)}>
            <ContractName address={derivativeAddress} />
          </ExternalLink>
        ) : (
          <>
            <ContractName address={derivativeAddress} /> (derivative)
          </>
        )
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
