import { BodyText, LinkText } from 'components/ui/Text'
import Button from 'components/ui/Button'
import Card from 'components/ui/Card'
import PrivacyDeath from 'components/landing/PrivacyDeath'
import classnames, { margin } from 'classnames/tailwind'

const bigWhaleLabsText = classnames(margin('mt-6'))
const learnMoreText = classnames(margin('mt-6'), margin('mb-2'))

export default function () {
  return (
    <div className={margin('mb-2')}>
      <Card color="primary" shadow onlyWrap>
        <PrivacyDeath />
        <div className={bigWhaleLabsText}>
          <BodyText>
            <LinkText
              targetBlank
              color="text-primary"
              url="https://bigwhalelabs.com"
            >
              Big Whale Labs{' '}
            </LinkText>
            is dedicated to building a pseudonymous world in which privacy and
            identity are owned by the human, not the corporation.
          </BodyText>
        </div>
        <div className={learnMoreText}>
          <LinkText targetBlank url="https://bigwhalelabs.com/">
            <Button type="tertiary" small withArrow gradientFont>
              Learn more about us
            </Button>
          </LinkText>
        </div>
      </Card>
    </div>
  )
}
