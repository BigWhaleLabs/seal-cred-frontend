import { FooterLink, SocialLink } from 'components/Text'
import Delimiter from 'components/Delimiter'
import Discord from 'icons/Discord'
import FooterLogo from 'icons/FooterLogo'
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
    <div className={socialContainerCard}>
      <div className={linkContainer}>
        <FooterLink url="https://blog.bigwhalelabs.com/">
          <div className={footerLogo}>
            <FooterLogo />
            <span>Blog</span>
          </div>
        </FooterLink>
        <Delimiter />
        <FooterLink internal url="/terms">
          Terms of service
        </FooterLink>
        <Delimiter />
        <FooterLink internal url="/privacy">
          Privacy policy
        </FooterLink>
      </div>
      {!md && (
        <div className={socialContainer}>
          <SocialLink url="https://discord.gg/NHk96pPZUV">
            <Discord />
          </SocialLink>
          <Delimiter />
          <SocialLink url="https://twitter.com/bigwhalelabs">
            <Twitter />
          </SocialLink>
        </div>
      )}
    </div>
  )
}
