import { BodyText, HeaderText, LinkText } from 'components/ui/Text'
import { margin } from 'classnames/tailwind'
import Button from 'components/ui/Button'
import GradientBorder from 'components/ui/GradientBorder'
import HorizontalRule from 'components/ui/HorizontalRule'
import MintedBadgeBlock from 'components/badges/MintedBadgeBlock'

export default function ({
  address,
  ids,
  resetEmail,
}: {
  address: string
  ids: number[]
  resetEmail: () => void
}) {
  return (
    <>
      <HeaderText extraLeading>Congrats!</HeaderText>
      <BodyText>You’ve minted a zkBadge verifying your work email!</BodyText>
      {ids.map((tokenId) => (
        <MintedBadgeBlock
          derivativeAddress={address}
          key={`${address}-${tokenId}`}
          tokenId={tokenId}
        />
      ))}
      <GradientBorder>
        <Button
          center
          fullWidth
          gradientFont
          small
          type="secondary"
          onClick={resetEmail}
        >
          Try another email
        </Button>
      </GradientBorder>
      <HorizontalRule color="formal-accent-semi-transparent" />
      <BodyText center>
        Interested in confessions from verified but anonymous work emails?
      </BodyText>
      <div>
        <div className={margin('mb-4')}>
          <LinkText targetBlank url="https://work.sealcred.xyz/how-it-works">
            <Button
              center
              fullWidth
              gradientFont
              small
              withArrow
              type="tertiary"
            >
              Try SealCred Work
            </Button>
          </LinkText>
        </div>
      </div>
    </>
  )
}
