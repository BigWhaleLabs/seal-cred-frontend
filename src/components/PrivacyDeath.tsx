import ArcText from 'components/ArcText'
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

export default function () {
  const { xxs, sm } = useBreakpoints()

  return (
    <div className={wrapperBox}>
      <div className={'absolute scale-150 md:-top-2/3 -top-1/2'}>
        <ArcText
          landing={xxs || sm}
          text="Give me privacy or give me death •"
        />
      </div>
      <div className={margin('-mt-5', 'mb-12')}>
        <EyeWhale />
      </div>
    </div>
  )
}
