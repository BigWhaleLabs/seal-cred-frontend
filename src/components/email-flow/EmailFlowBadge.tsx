import { BodyText, HeaderText } from 'components/Text'
import Button from 'components/Button'
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
      <Button fullWidth center small type="secondary" onClick={resetEmail}>
        Try another email
      </Button>
    </>
  )
}
