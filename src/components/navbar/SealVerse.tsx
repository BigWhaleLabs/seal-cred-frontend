import Dropdown from 'components/Dropdown'

export default function () {
  const options = [
    { label: 'SealCred', selected: true },
    { label: 'SealCred Echo', href: 'https://echo.sealcred.xyz' },
  ]

  return <Dropdown currentValue="SealVerse" options={options} fitToItemSize />
}
