import ArcText from 'components/ArcText'
import EyeWhale from 'icons/EyeWhale'
import classnames, {
  alignItems,
  display,
  flexDirection,
  position,
} from 'classnames/tailwind'
import useBreakpoints from 'helpers/useBreakpoints'

const wrapperBox = classnames(
  position('relative'),
  display('flex'),
  alignItems('items-center'),
  flexDirection('flex-col')
)

const PrivacyDeath = () => {
  const { lg } = useBreakpoints()

  return (
    <div className={wrapperBox}>
      <div
        className={`absolute scale-150 md:-top-1/2 -top-1/4 ${
          lg ? undefined : 'right-6 tiny:right-20'
        }`}
      >
        <ArcText text="Give me privacy or give me death •" />
      </div>
      <EyeWhale />
    </div>
  )
}

export default PrivacyDeath
