import { AccentText } from 'components/Text'
import classnames, { display, width } from 'classnames/tailwind'

const bottomSeparator = classnames(
  width('w-fit'),
  display('hidden', 'md:block')
)

export default function () {
  return (
    <div className={bottomSeparator}>
      <AccentText small color="text-secondary">
        |
      </AccentText>
    </div>
  )
}
