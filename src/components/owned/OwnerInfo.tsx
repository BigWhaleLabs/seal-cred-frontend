import { AccentText, BodyText, HeaderText } from 'components/Text'
import { JSXInternal } from 'preact/src/jsx'
import Card from 'components/Card'
import CardTitle from 'components/CardTitle'
import ContractName from 'components/ContractName'
import ExternalLink from 'components/ExternalLink'
import HorizontalRule from 'components/HorizontalRule'
import Network from 'models/Network'
import OwnedBadgeAddress from 'components/owned/OwnedBadgeAddress'
import ShareCTAButtons from 'components/owned/ShareCTAButtons'
import Smile from 'icons/Smile'
import classnames, {
  alignItems,
  display,
  flexDirection,
  space,
} from 'classnames/tailwind'
import data from 'data'
import getEtherscanAddressUrl from 'helpers/network/getEtherscanAddressUrl'
import handleError from 'helpers/handleError'
import useBadgeContracts, { BaseBadgeContract } from 'hooks/useBadgeContracts'

const walletBox = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-4'),
  alignItems('items-center')
)
const walletAddress = classnames(display('flex'), flexDirection('flex-col'))

function replaceKeywordsInString(
  template: string,
  keyword: string,
  element: JSXInternal.Element
) {
  return template
    .split(keyword)
    .reduce(
      (chain, part, index) =>
        index === 0 ? chain.concat(part) : chain.concat(element).concat(part),
      [] as (JSXInternal.Element | string)[]
    )
}

function BadgeTitle({
  badge: { type, derivative },
}: {
  badge: BaseBadgeContract
}) {
  const { ownerTitle } = data[type]

  if (!ownerTitle) return null

  const derivativeLink = (
    <ExternalLink url={getEtherscanAddressUrl(derivative, Network.Goerli)}>
      <AccentText bold color="text-secondary">
        <ContractName hyphens address={derivative} network={Network.Goerli} />
      </AccentText>
    </ExternalLink>
  )

  const title = replaceKeywordsInString(
    ownerTitle,
    '{derivative}',
    derivativeLink
  )

  return <HeaderText extraLeading>{title}</HeaderText>
}

function BadgeContent({
  badge: { type, original },
}: {
  badge: BaseBadgeContract
}) {
  const { ownerContent, network } = data[type]

  if (!ownerContent) return null

  const originalLink = (
    <ExternalLink url={getEtherscanAddressUrl(original, network)}>
      <AccentText color="text-secondary">
        <ContractName address={original} network={network} />
      </AccentText>
    </ExternalLink>
  )

  const content = replaceKeywordsInString(
    ownerContent,
    '{original}',
    originalLink
  )

  return (
    <BodyText>
      {content}
      <ShareCTAButtons />
    </BodyText>
  )
}

export default function ({
  derivativeAddress,
  tokenId,
}: {
  derivativeAddress: string
  tokenId: string
}) {
  const contractToBadge = useBadgeContracts()
  const badge = contractToBadge[derivativeAddress]

  if (!badge) {
    handleError('Looks like this contract was removed')
    return (
      <Card color="secondary" shadow onlyWrap>
        <CardTitle
          title="Unsupported NFT"
          subtitle="This NFT is not supported"
        />
      </Card>
    )
  }

  return (
    <Card
      color="secondary"
      shadow
      paddingType="normal"
      onlyWrap
      noArcTextSpace
      spinner="Certified with SealCred ZK Proofs"
    >
      <BadgeTitle badge={badge} />
      <BadgeContent badge={badge} />
      <HorizontalRule color="primary-semi-dimmed" />
      <div className={walletBox}>
        <Smile />
        <div className={walletAddress}>
          <BodyText small>Wallet address</BodyText>
          <OwnedBadgeAddress
            tokenId={tokenId}
            derivativeAddress={derivativeAddress}
            network={Network.Goerli}
          />
        </div>
      </div>
    </Card>
  )
}
