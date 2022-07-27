import { LinkText, SocialLink } from 'components/Text'
import Delimiter from 'components/Delimiter'
import Discord from 'icons/Discord'
import FooterLogo from 'icons/FooterLogo'
import Spacer from 'components/Spacer'
import Twitter from 'icons/Twitter'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  padding,
  space,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const commonClasses = classnames(display('flex'), alignItems('items-center'))
const socialContainerCard = classnames(
  commonClasses,
  flexDirection('flex-col', 'md:flex-row'),
  padding('py-8', 'px-4', 'lg:px-25'),
  space('space-y-4', 'md:space-x-4', 'md:space-y-0')
)

const socialContainer = classnames(
  commonClasses,
  flexDirection('flex-row'),
  space('space-x-4')
)
const linkContainer = classnames(
  commonClasses,
  flexDirection('flex-col', 'md:flex-row'),
  space('space-y-2', 'md:space-y-0', 'md:space-x-4')
)
const footerLogo = classnames(
  commonClasses,
  justifyContent('justify-center'),
  flexDirection('flex-row'),
  space('space-x-4')
)

export default function () {
  const { md } = useBreakpoints()

  return (
    <>
      <Spacer />
      <div className={socialContainerCard}>
        <div className={linkContainer}>
          <LinkText url="https://blog.bigwhalelabs.com/" targetBlank>
            <div className={footerLogo}>
              <FooterLogo />
              <span>Blog</span>
            </div>
          </LinkText>
          <Delimiter />
          <LinkText url="/terms" targetBlank>
            Terms of service
          </LinkText>
          <Delimiter />
          <LinkText url="/privacy" targetBlank>
            Privacy policy
          </LinkText>
        </div>
        {!md && (
          <>
            <div className={socialContainer}>
              <SocialLink url="https://discord.gg/NHk96pPZUV">
                <Discord />
              </SocialLink>
              <Delimiter />
              <SocialLink url="https://twitter.com/bigwhalelabs">
                <Twitter />
              </SocialLink>
            </div>
          </>
        )}
      </div>
    </>
  )
}
