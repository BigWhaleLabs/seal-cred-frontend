import {
  animation,
  classnames,
  height,
  opacity,
  textColor,
  width,
} from 'classnames/tailwind'

const icon = (small?: boolean) =>
  classnames(
    animation('animate-spin'),
    textColor('text-inherit'),
    width(small ? 'w-3' : 'w-5'),
    height(small ? 'h-3' : 'h-5')
  )
const iconPath = classnames(opacity('opacity-100'))

interface LoadingProps {
  small?: boolean
}

export default function ({ small }: LoadingProps) {
  return (
    <svg className={icon(small)} viewBox="0 0 24 24">
      <path
        className={iconPath}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}
