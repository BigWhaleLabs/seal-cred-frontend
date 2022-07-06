import { BodyText, LinkText } from 'components/Text'
import Button from 'components/Button'
import Card from 'components/Card'
import PrivacyDeath from 'components/landing/PrivacyDeath'
import classnames, { margin, padding } from 'classnames/tailwind'

const wrapper = classnames(padding('md:pb-20', 'pb-0'), margin('mb-4'))
const bigWhaleLabsText = classnames(margin('mt-6'))
const learnMoreText = classnames(margin('mt-6'), margin('mb-2'))

export default function () {
  return (
    <div className={wrapper}>
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
          <Button
            type="tertiary"
            small
            withArrow
            gradientFont
            onClick={() =>
              window.open('https://bigwhalelabs.com/', '_blank')?.focus()
            }
          >
            Learn more about us
          </Button>
        </div>
      </Card>
    </div>
  )
}
