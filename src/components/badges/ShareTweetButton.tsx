import { width } from 'classnames/tailwind'
import Button from 'components/ui/Button'
import CTAText from 'helpers/CTAText'
import ExternalLink from 'components/ui/ExternalLink'
import getShareToTwitterLink from 'helpers/getShareToTwitterLink'

export default function ({
  closeNotification,
}: {
  closeNotification: () => void
}) {
  return (
    <ExternalLink url={getShareToTwitterLink({ text: CTAText })}>
      <Button small type="secondary" onClick={closeNotification}>
        <div className={width('w-max')}>Share a Tweet</div>
      </Button>
    </ExternalLink>
  )
}
