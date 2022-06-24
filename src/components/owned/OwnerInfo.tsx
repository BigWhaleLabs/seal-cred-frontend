import { AccentText, BodyText, HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Card from 'components/Card'
import ContractName from 'components/ContractName'
import ExternalLink from 'components/ExternalLink'
import OwnedBadgeAddress from 'components/owned/OwnedBadgeAddress'
import SealCredStore from 'stores/SealCredStore'
import Smile from 'icons/Smile'
import Title from 'components/Title'
import classnames, {
  alignItems,
  borderColor,
  display,
  flexDirection,
  space,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import handleError from 'helpers/handleError'

const walletBox = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-4'),
  alignItems('items-center')
)
const walletAddress = classnames(display('flex'), flexDirection('flex-col'))
export default function ({
  derivativeAddress,
  tokenId,
}: {
  derivativeAddress: string
  tokenId: string
}) {
  const { reverseErc721Ledger, reverseEmailLedger } = useSnapshot(SealCredStore)
  const emailRecord = reverseEmailLedger[derivativeAddress]
  const record = reverseErc721Ledger[derivativeAddress] || emailRecord

  if (!record) {
    handleError('Looks like this contract was removed')
    return (
      <Card color="secondary" shadow onlyWrap>
        <Title title="Unsupported NFT" subtitle="This NFT is not supported" />
      </Card>
    )
  }

  return (
    <Card
      color="secondary"
      shadow
      onlyWrap
      spinner="Certified with SealCred ZK Proof"
    >
      <HeaderText extraLeading>
        {emailRecord
          ? 'This wallet belongs to someone with'
          : 'This wallet owns a'}{' '}
        <ExternalLink url={getEtherscanAddressUrl(derivativeAddress)}>
          <AccentText bold color="text-secondary">
            <ContractName address={derivativeAddress} />
          </AccentText>
        </ExternalLink>
      </HeaderText>

      <BodyText>
        {emailRecord
          ? 'This is a zkNFT derivative of a work email. It means this person has been verified to work at '
          : 'This is a zkNFT derivative. It means this person has been verified to own at least one '}
        ‘
        <ExternalLink
          url={getEtherscanAddressUrl(record.derivativeContract.address)}
        >
          <AccentText color="text-secondary">
            <ContractName address={record.derivativeContract.address} />
          </AccentText>
        </ExternalLink>
        ‘{emailRecord ? '.' : ' NFT.'}
      </BodyText>

      <hr className={borderColor('border-primary-semi-dimmed')} />

      <div className={walletBox}>
        <Smile />
        <div className={walletAddress}>
          <BodyText small>Wallet address</BodyText>
          <OwnedBadgeAddress
            tokenId={tokenId}
            derivativeAddress={derivativeAddress}
          />
        </div>
      </div>
    </Card>
  )
}
