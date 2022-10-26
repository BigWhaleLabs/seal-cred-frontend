import { SocialLink } from 'components/ui/Text'
import { displayFrom } from 'helpers/visibilityClassnames'
import Delimiter from 'components/navbar/Delimiter'
import Discord from 'icons/Discord'
import Twitter from 'icons/Twitter'
import classnames, { alignItems, display, space } from 'classnames/tailwind'

const socialLinksContainer = classnames(
  displayFrom('lg'),
  display('inline-flex'),
  alignItems('items-center'),
  space('space-x-4')
)

export default function () {
  return (
    <div className={socialLinksContainer}>
      <SocialLink url="https://discord.gg/NHk96pPZUV">
        <Discord />
      </SocialLink>
      <SocialLink url="https://twitter.com/bigwhalelabs">
        <Twitter />
      </SocialLink>
      <Delimiter />
    </div>
  )
}
