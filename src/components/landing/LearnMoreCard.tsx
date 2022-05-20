import { BodyText, LinkText } from 'components/Text'
import { margin, space } from 'classnames/tailwind'
import Button from 'components/Button'
import Card from 'components/Card'
import PrivacyDeath from 'components/PrivacyDeath'

const bottomExtraSpace = margin('mb-24')
const learnMoreCardWrapper = space('space-y-6')

export default function () {
  return (
    <div className={bottomExtraSpace}>
      <Card color="primary" shadow onlyWrap>
        <div className={learnMoreCardWrapper}>
          <PrivacyDeath />
          <BodyText>
            <LinkText color="text-primary" url={`https://bigwhalelabs.com`}>
              Big Whale Labs{' '}
            </LinkText>
            is dedicated to building a pseudonymous world in which privacy and
            identity are owned by the human, not the corporation.
          </BodyText>
          <Button
            withArrow
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
