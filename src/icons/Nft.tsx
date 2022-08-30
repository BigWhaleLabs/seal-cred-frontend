import CommonIconsProps from 'icons/CommonIconsProps'
import classnames, { stroke, strokeWidth } from 'classnames/tailwind'

export default function ({ inheritStrokeColor }: CommonIconsProps) {
  const pathStyles = classnames(
    strokeWidth('stroke-2'),
    stroke(inheritStrokeColor ? 'stroke-inherit' : 'stroke-formal-accent')
  )

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 15.5L4.29288 8.62621C4.60509 6.96628 6.97375 6.94155 7.32055 8.5946V8.5946C7.64121 10.1231 9.76908 10.2632 10.2873 8.7899L12.5 2.5"
        className={pathStyles}
      />
      <path
        d="M10 21.5V16.75M14.5 12H14C11.7909 12 10 13.7909 10 16V16.75M10 16.75H14.5"
        className={pathStyles}
      />
      <path d="M15 7H18.25M21.5 7H18.25M18.25 7V14.5" className={pathStyles} />
    </svg>
  )
}
