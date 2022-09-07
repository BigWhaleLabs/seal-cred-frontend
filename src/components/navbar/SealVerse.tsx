import Dropdown from 'components/Dropdown'
import sealVerseData from 'sealVerseData'

export default function () {
  return (
    <Dropdown
      currentValue={window.location.origin}
      options={sealVerseData}
      staticPlaceholder="SealVerse"
      onChange={(value) => {
        if (value && value !== window.location.origin)
          window.open(value, '_blank')
      }}
      fitToItemSize
    />
  )
}
