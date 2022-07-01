import { BodyText, SocialLink } from 'components/Text'
import Discord from 'icons/Discord'
import Twitter from 'icons/Twitter'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  justifyContent,
  margin,
  padding,
  space,
  width,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const socialContainerCard = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  width('w-mobile-card', 'sm:w-card'),
  backgroundColor('bg-primary-background'),
  space('space-y-4'),
  padding('p-4'),
  margin('mx-auto'),
  borderRadius('rounded-2xl')
)

const socialContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('space-x-6')
)

export default function () {
  const { md } = useBreakpoints()
  if (md) return null

  return (
    <div className={socialContainerCard}>
      <div className={padding('px-8')}>
        <BodyText center>
          Stay up to date, provide feedback, or just hang.
        </BodyText>
      </div>
      <div className={socialContainer}>
        <SocialLink tertiary url="https://discord.gg/NHk96pPZUV">
          <Discord />
        </SocialLink>
        <SocialLink tertiary url="https://twitter.com/bigwhalelabs">
          <Twitter />
        </SocialLink>
      </div>
    </div>
  )
}
