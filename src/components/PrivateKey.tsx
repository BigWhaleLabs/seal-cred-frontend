import { FC } from 'react'
import { SubheaderText } from 'components/Text'
import { classnames } from 'classnames/tailwind'

const privateKey = classnames(
  'flex',
  'flex-row',
  'items-center',
  'py-4',
  'px-8',
  'space-x-2',
  'rounded-3xl',
  'bg-private-key',
  'transition-colors'
)
const privateKeyCopy = classnames('transition-colors')

const PrivateKey: FC = () => {
  return (
    <div className={privateKey}>
      <SubheaderText>••••••••</SubheaderText>
      <svg
        width="24"
        height="24"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={privateKeyCopy}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.99699 16C10.101 16 10.997 15.104 10.997 14H5.99699C4.05399 14 2.99699 12.811 2.99699 11.015V4C1.89299 4 0.996994 4.896 0.996994 6V14C0.996994 15.104 1.89299 16 2.99699 16H8.99699ZM12.003 13H5.99699C4.89299 13 3.99699 12.104 3.99699 11V3C3.99699 1.896 4.89299 1 5.99699 1H12.003C13.107 1 14.003 1.896 14.003 3V11C14.003 12.104 13.107 13 12.003 13ZM8.49699 8H6.49699C6.22099 8 5.99699 8.224 5.99699 8.5C5.99699 8.776 6.22099 9 6.49699 9H8.49699C8.77299 9 8.99699 8.776 8.99699 8.5C8.99699 8.224 8.77299 8 8.49699 8ZM11.497 6H6.49699C6.22099 6 5.99699 6.224 5.99699 6.5C5.99699 6.776 6.22099 7 6.49699 7H11.497C11.773 7 11.997 6.776 11.997 6.5C11.997 6.224 11.773 6 11.497 6ZM11.497 4H6.49699C6.22099 4 5.99699 4.224 5.99699 4.5C5.99699 4.776 6.22099 5 6.49699 5H11.497C11.773 5 11.997 4.776 11.997 4.5C11.997 4.224 11.773 4 11.497 4Z"
          fill="#777e90"
        />
      </svg>
    </div>
  )
}

export default PrivateKey
