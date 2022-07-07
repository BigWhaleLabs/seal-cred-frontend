import { AccentText, BodyText, HeaderText } from 'components/Text'
import AlphaSeal from 'components/landing/AlphaSeal'
import Card from 'components/Card'
import GetStartedButton from 'components/landing/GetStartedButton'
import classnames, {
  inset,
  position,
  space,
  visibility,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const initialCardWrapper = space('space-y-4')
const alphaSealWrapper = classnames(
  position('absolute'),
  inset('-left-78', 'top-48'),
  visibility('invisible', 'lg:visible')
)

export default function () {
  const { xs } = useBreakpoints()

  return (
    <Card
      shadow
      color="accent"
      onlyWrap
      nospace
      spinner={!xs ? 'One Identity to rule them all' : undefined}
    >
      <div className={initialCardWrapper}>
        <div className={alphaSealWrapper}>
          <AlphaSeal />
        </div>
        <HeaderText extraLeading>
          Build your pseudonymous identity with ZK badges
        </HeaderText>
        <BodyText>
          <AccentText color="text-accent">SealCred</AccentText> allows you to
          experience the world pseudonymously with ZK badges. This means you can
          prove ownership of an NFT without it tracing back to you.
        </BodyText>
        <GetStartedButton />
      </div>
    </Card>
  )
}
