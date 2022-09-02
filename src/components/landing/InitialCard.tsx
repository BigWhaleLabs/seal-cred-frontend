import { AccentText, BodyText, HeaderText } from 'components/ui/Text'
import AlphaSeal from 'components/landing/AlphaSeal'
import Card from 'components/ui/Card'
import GetStartedButton from 'components/landing/GetStartedButton'
import classnames, {
  inset,
  position,
  space,
  visibility,
} from 'classnames/tailwind'

const initialCardWrapper = space('space-y-4')
const alphaSealWrapper = classnames(
  position('absolute'),
  inset('-left-78', 'top-48'),
  visibility('invisible', 'lg:visible')
)

export default function () {
  return (
    <Card
      shadow
      color="accent"
      onlyWrap
      nospace
      spinner={{ text: 'One Identity to rule them all' }}
    >
      <div className={initialCardWrapper}>
        <HeaderText extraLeading>
          Build your pseudonymous identity with ZK badges
        </HeaderText>
        <BodyText>
          <AccentText color="text-accent">SealCred</AccentText> allows you to
          experience the world pseudonymously with ZK badges. This means you can
          prove ownership of an NFT without it tracing back to you.
        </BodyText>
        <GetStartedButton />
        <div className={alphaSealWrapper}>
          <AlphaSeal />
        </div>
      </div>
    </Card>
  )
}
