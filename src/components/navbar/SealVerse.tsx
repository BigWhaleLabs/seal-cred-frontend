import { displayFrom } from 'helpers/visibilityClassnames'
import Dropdown from 'components/Dropdown'
import sealVerseData from 'sealVerseData'

const placeholder = <div className={displayFrom('xs')}>SealVerse</div>

export default function () {
  return (
    <Dropdown
      fitToItemSize
      currentValue={window.location.origin}
      options={sealVerseData}
      staticPlaceholder={placeholder}
      onChange={(value) => {
        if (value && value !== window.location.origin)
          window.open(value, '_blank')
      }}
    />
  )
}
