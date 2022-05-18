import {
  AccentText,
  BodyText,
  CardDescription,
  CardHeader,
  HeaderText,
} from 'components/Text'
import { Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Card from 'components/Card'
import ContractName from 'components/ContractName'
import NotFound from 'pages/NotFound'
import OwnedBadgeAddress from 'components/OwnedBadgeAddress'
import SealCredStore from 'stores/SealCredStore'
import Smile from 'icons/Smile'
import classnames, {
  alignItems,
  borderColor,
  display,
  flexDirection,
  justifyContent,
  margin,
  space,
  textOverflow,
} from 'classnames/tailwind'
import handleError from 'helpers/handleError'

const mainBox = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center')
)
const walletBox = classnames(display('flex'), flexDirection('flex-row'))
const walletAddress = classnames(
  display('flex'),
  flexDirection('flex-col'),
  margin('ml-4'),
  textOverflow('truncate')
)
const getStartedCard = classnames(margin('mt-6'))

function OwnerInfo({
  derivativeAddress,
  tokenId,
}: {
  derivativeAddress: string
  tokenId: string
}) {
  const { derivativeLedger } = useSnapshot(SealCredStore)
  const record = derivativeLedger[derivativeAddress]

  if (!record) {
    handleError('Looks like this contract was removed')
    return (
      <Card color="secondary" shadow onlyWrap>
        <div className={space('space-y-2')}>
          <CardHeader color="text-accent">Unsupported NFT</CardHeader>
          <CardDescription>This NFT is not supported</CardDescription>
        </div>
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
      <HeaderText size="4xl" leading={11}>
        This wallet owns a{' '}
        <AccentText color="text-secondary" bold>
          <ContractName address={derivativeAddress} truncatedStyle />
        </AccentText>
      </HeaderText>

      <BodyText size="base">
        This is a zkNFT derivative. It means this person has been verified to
        own at least one ‘
        <AccentText color="text-secondary">
          <ContractName
            address={record.originalContract.address}
            truncatedStyle
          />
        </AccentText>
        ‘ NFT.
      </BodyText>

      <hr className={borderColor('border-primary-semi-dimmed')} />

      <div className={walletBox}>
        <Smile />
        <div className={walletAddress}>
          <BodyText size="sm">Wallet address</BodyText>
          <OwnedBadgeAddress
            tokenId={tokenId}
            derivativeAddress={derivativeAddress}
          />
        </div>
      </div>
    </Card>
  )
}

export default function () {
  const { derivativeAddress, tokenId } = useParams()

  const navigate = useNavigate()

  return derivativeAddress && tokenId !== undefined ? (
    <div className={mainBox}>
      <Suspense
        fallback={
          <Card color="secondary" shadow onlyWrap>
            <div className={space('space-y-2')}>
              <CardHeader color="text-accent">Loading...</CardHeader>
              <CardDescription>
                Please, wait until I load supported NFTs, it can take a minute
              </CardDescription>
            </div>
          </Card>
        }
      >
        <OwnerInfo derivativeAddress={derivativeAddress} tokenId={tokenId} />
      </Suspense>

      <div className={getStartedCard}>
        <Card color="tertiary" shadow onlyWrap>
          <AccentText color="text-tertiary">
            Create your own zkNFT with SealCred.
          </AccentText>
          <Button colors="accent" small onClick={() => navigate('/')}>
            Get started
          </Button>
        </Card>
      </div>
    </div>
  ) : (
    <NotFound />
  )
}
