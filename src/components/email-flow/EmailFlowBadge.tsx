import { BodyText, HeaderText, LinkText } from 'components/Text'
import Button from 'components/Button'
import HorizontalRule from 'components/HorizontalRule'
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
      <HorizontalRule color="formal-accent" />
      <BodyText center>
        Interested in confessions from verified but anonymous work emails?
      </BodyText>
      <div>
        <LinkText url="https://work.sealcred.xyz/how-it-works">
          <Button type="tertiary" small withArrow gradientFont fullWidth center>
            Try SealCred Work
          </Button>
        </LinkText>
      </div>
    </>
  )
}
