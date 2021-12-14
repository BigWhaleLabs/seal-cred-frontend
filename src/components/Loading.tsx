import { FC } from 'react'
import { classnames } from 'classnames/tailwind'

const loader = classnames('animate-spin', 'text-accent')
const icon = (big?: boolean) =>
  classnames(loader, big ? 'w-7' : 'w-5', big ? 'h-7' : 'h-5')

const Loading: FC<{ big?: boolean }> = ({ big }) => {
  return (
    <svg className={icon(big)} viewBox="0 0 24 24">
      <path
        className={classnames('opacity-100')}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

export default Loading
