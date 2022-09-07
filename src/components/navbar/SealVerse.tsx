import Dropdown from 'components/Dropdown'
import sealVerseData from 'sealVerseData'

export default function () {
  return (
    <Dropdown currentValue="SealVerse" options={sealVerseData} fitToItemSize />
  )
}
