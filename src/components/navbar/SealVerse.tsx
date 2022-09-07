import { useLocation } from 'react-router-dom'
import Dropdown from 'components/Dropdown'
import sealVerseData from 'sealVerseData'

export default function () {
  const location = useLocation()

  return (
    <Dropdown
      currentValue="SealVerse"
      options={sealVerseData}
      fitToItemSize
      detectSelected={(label) =>
        location.pathname.includes(label.toLocaleLowerCase())
      }
    />
  )
}
