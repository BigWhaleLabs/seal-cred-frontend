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
import useBreakpoints from 'hooks/useBreakpoints'

const wrapperBox = classnames(
  position('relative'),
  display('flex'),
  alignItems('items-center'),
  flexDirection('flex-col'),
  width('w-full')
)
const eyeBoxMargin = margin('-mt-10', 'mb-12', 'ml-3', 'md:ml-0')

export default function () {
  const { xxs, sm, md } = useBreakpoints()

  return (
    <div className={wrapperBox}>
      <div className={'absolute scale-150 md:-top-24 -top-16'}>
        <ArcText
          mobile={(xxs || sm) && !md}
          text="Give me privacy or give me death •"
        />
      </div>
      <div className={eyeBoxMargin}>
        <EyeWhale />
      </div>
    </div>
  )
}
