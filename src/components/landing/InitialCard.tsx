import { AccentText, BodyText, HeaderText } from 'components/Text'
import { space } from 'classnames/tailwind'
import Card from 'components/Card'
import GetStartedButton from 'components/GetStartedButton'
import useBreakpoints from 'hooks/useBreakpoints'

const initialCardWrapper = space('space-y-4')

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
