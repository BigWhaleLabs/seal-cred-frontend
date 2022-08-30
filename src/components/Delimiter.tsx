import { AccentText } from 'components/Text'
import { displayFrom } from 'helpers/visibilityClassnames'
import classnames, { width } from 'classnames/tailwind'

const bottomSeparator = classnames(width('w-fit'), displayFrom('md'))

export default function () {
  return (
    <div className={bottomSeparator}>
      <AccentText small color="text-secondary">
        |
      </AccentText>
    </div>
  )
}
