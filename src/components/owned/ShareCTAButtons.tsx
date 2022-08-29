import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import Button from 'components/Button'
import CTAText from 'helpers/CTAText'
import GradientBorder from 'components/GradientBorder'
import LinkChain from 'icons/LinkChain'
import Twitter from 'icons/Twitter'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  margin,
  space,
  textColor,
} from 'classnames/tailwind'
import getShareToTwitterLink from 'helpers/getShareToTwitterLink'

const buttonContentWrapper = classnames(
  display('flex'),
  flexDirection('flex-row'),
  gap('gap-x-3'),
  textColor('text-inherit'),
  alignItems('items-center')
)

const buttonWrapper = classnames(
  display('flex'),
  flexDirection('flex-col', 'xs:flex-row'),
  alignItems('items-center'),
  space('space-y-3', 'xs:space-y-0', 'xs:space-x-3'),
  margin('my-4')
)

async function copy(pathname: string) {
  await navigator.clipboard.writeText('sealcred.xyz' + pathname)
}

export default function () {
  const { pathname } = useLocation()

  return (
    <div className={buttonWrapper}>
      <GradientBorder>
        <Button
          gradientFont
          type="secondary"
          small
          url={getShareToTwitterLink({ text: CTAText })}
        >
          <div className={buttonContentWrapper}>
            <div className="text-white">
              <Twitter />
            </div>
            Tweet
          </div>
        </Button>
      </GradientBorder>
      <GradientBorder>
        <Button
          gradientFont
          type="secondary"
          small
          onClick={async () => {
            await copy(pathname)
            toast('Link copied 👍')
          }}
        >
          <div className={buttonContentWrapper}>
            <div className="text-white">
              <LinkChain />
            </div>
            Copy link
          </div>
        </Button>
      </GradientBorder>
    </div>
  )
}
