import ArcText from 'icons/ArcText'
import EyeWhale from 'icons/EyeWhale'
import classnames, {
  alignItems,
  display,
  flexDirection,
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

export default function () {
  return (
    <div className={wrapperBox}>
      <div className={'absolute scale-150 md:-top-24 -top-16'}>
        <ArcText text="Give me privacy or give me death •" />
      </div>
      <div className={eyeBoxMargin}>
        <EyeWhale />
      </div>
    </div>
  )
}
