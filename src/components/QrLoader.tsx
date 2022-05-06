import { BodyText } from 'components/Text'
import QRLoading from 'icons/QRLoading'
import classnames, {
  alignItems,
  borderRadius,
  display,
  height,
  inset,
  justifyContent,
  position,
  width,
} from 'classnames/tailwind'

const wrapper = classnames(
  height('h-fit'),
  width('w-fit'),
  position('relative'),
  display('flex')
)
const image = classnames(height('h-fit'), borderRadius('rounded-3xl'))
const loader = classnames(
  position('absolute'),
  inset('left-0', 'top-0', 'right-0', 'bottom-0'),
  display('flex'),
  justifyContent('justify-center'),
  alignItems('items-center')
)

// @Todo: change loading text to Loader when it comes

export default function QrLoader() {
  return (
    <div className={wrapper}>
      <QRLoading className={image} />
      <div className={loader}>
        <BodyText size="lg" center>
          Generating
        </BodyText>
      </div>
    </div>
  )
}
