import ArcText from 'icons/ArcText'
import EyeWhale from 'icons/EyeWhale'
import classnames, {
  alignItems,
  display,
  flexDirection,
  inset,
  margin,
  position,
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
const arcText = classnames(position('absolute'), inset('-top-16'))

export default function () {
  return (
    <div className={wrapperBox}>
      <div className={arcText}>
        <ArcText diameter={180} text="Give me privacy or give me death  •" />
      </div>
      <div className={eyeBoxMargin}>
        <EyeWhale />
      </div>
    </div>
  )
}
