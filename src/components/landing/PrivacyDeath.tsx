import ArcText from 'icons/ArcText'
import EyeWhale from 'icons/EyeWhale'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  display,
  flexDirection,
  inset,
  margin,
  position,
  scale,
  width,
} from 'classnames/tailwind'

const wrapperBox = classnames(
  position('relative'),
  display('flex'),
  alignItems('items-center'),
  flexDirection('flex-col'),
  width('w-full')
)
const eyeBoxMargin = margin('-mt-10', 'mb-12', 'mx-auto')
const arcText = classNamesToString(
  classnames(position('absolute'), scale('scale-150'), inset('tablet:-top-24')),
  '-top-16'
)

export default function () {
  return (
    <div className={wrapperBox}>
      <div className={arcText}>
        <ArcText
          text="Give me privacy or give me death •"
          smallCircle
          thinText
        />
      </div>
      <div className={eyeBoxMargin}>
        <EyeWhale />
      </div>
    </div>
  )
}
