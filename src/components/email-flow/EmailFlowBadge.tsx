import { BodyText, HeaderText, LinkText } from 'components/ui/Text'
import Button from 'components/ui/Button'
import HorizontalRule from 'components/ui/HorizontalRule'
import MintedBadgeBlock from 'components/badges/MintedBadgeBlock'
import MintedToken from 'models/MintedToken'

export default function ({
  minted,
  resetEmail,
}: {
  minted: MintedToken[]
  resetEmail: () => void
}) {
  return (
    <>
      <HeaderText extraLeading>Congrats!</HeaderText>
      <BodyText>You’ve minted a zkBadge verifying your work email!</BodyText>
      {minted.map(({ address, tokenId }) => (
        <MintedBadgeBlock
          key={`${address}-${tokenId}`}
          derivativeAddress={address}
          tokenId={tokenId.toNumber()}
        />
      ))}
      <Button
        gradientFont
        fullWidth
        center
        small
        type="secondary"
        onClick={resetEmail}
      >
        Try another email
      </Button>
      <HorizontalRule color="formal-accent-semi-transparent" />
      <BodyText center>
        Interested in confessions from verified but anonymous work emails?
      </BodyText>
      <div>
        <LinkText targetBlank url="https://work.sealcred.xyz/how-it-works">
          <Button type="tertiary" small withArrow gradientFont fullWidth center>
            Try SealCred Work
          </Button>
        </LinkText>
      </div>
    </>
  )
}
