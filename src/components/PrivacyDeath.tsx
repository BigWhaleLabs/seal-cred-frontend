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
      <div className="absolute lg:-top-1/2 -top-5">
        <ArcText text="Give me privacy or give me death •" radius={450} />
      </div>
      <EyeWhale />
    </div>
  )
}

export default PrivacyDeath
