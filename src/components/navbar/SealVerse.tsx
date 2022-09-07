import { useLocation } from 'react-router-dom'
import Dropdown from 'components/Dropdown'
import openLinkInNewTab from 'helpers/openLinkInNewTab'

export default function () {
  const location = useLocation()
  const options = [
    { label: 'SealCred' },
    {
      label: 'SealCred Echo',
      onSelect: () => openLinkInNewTab('https://echo.sealcred.xyz'),
    },
  ]

  return (
    <Dropdown
      currentValue="SealVerse"
      options={options}
      fitToItemSize
      detectSelected={(label) =>
        location.pathname.includes(label.toLowerCase())
      }
    />
  )
}
