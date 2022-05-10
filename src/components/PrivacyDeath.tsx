import ArcText from 'components/ArcText'
import EyeWhale from 'icons/EyeWhale'
import classnames, {
  alignItems,
  display,
  flexDirection,
  position,
} from 'classnames/tailwind'

const wrapperBox = classnames(
  position('relative'),
  display('flex'),
  alignItems('items-center'),
  flexDirection('flex-col')
)

const PrivacyDeath = () => {
  return (
    <div className={wrapperBox}>
      <div className="absolute -top-1/2">
        <ArcText text="Give me privacy or give me death •" radius={400} />
      </div>
      <EyeWhale />
    </div>
  )
}

export default PrivacyDeath
