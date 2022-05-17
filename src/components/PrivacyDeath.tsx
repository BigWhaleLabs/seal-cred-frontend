import ArcText from 'icons/ArcText'
import EyeWhale from 'icons/EyeWhale'
import classnames, {
  alignItems,
  display,
  flexDirection,
  position,
  width,
} from 'classnames/tailwind'
import useBreakpoints from 'helpers/useBreakpoints'

const wrapperBox = classnames(
  position('relative'),
  display('flex'),
  alignItems('items-center'),
  flexDirection('flex-col'),
  width('w-full')
)

const PrivacyDeath = () => {
  const { xs, sm } = useBreakpoints()

  return (
    <div className={wrapperBox}>
      <div className={'absolute scale-150 md:-top-2/3 -top-1/2'}>
        <ArcText landing={xs || sm} text="Give me privacy or give me death •" />
      </div>
      <EyeWhale />
    </div>
  )
}

export default PrivacyDeath
