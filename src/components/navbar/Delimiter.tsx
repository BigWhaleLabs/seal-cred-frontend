import { displayFrom } from 'helpers/visibilityClassnames'
import classnames, {
  backgroundColor,
  borderWidth,
  height,
  width,
} from 'classnames/tailwind'

const lastDelimiterContainer = classnames(
  displayFrom('xs'),
  borderWidth('border-0'),
  backgroundColor('bg-primary-dimmed'),
  width('w-px'),
  height('h-4')
)

export default function () {
  return <hr className={lastDelimiterContainer} />
}
