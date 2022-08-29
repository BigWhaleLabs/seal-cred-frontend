import CommonIconsProps from 'icons/CommonIconsProps'
import classnames, { stroke, strokeWidth } from 'classnames/tailwind'

export default function ({ inheritStrokeColor }: CommonIconsProps) {
  const commonPathStyles = classnames(
    stroke(inheritStrokeColor ? 'stroke-inherit' : 'stroke-primary-background'),
    strokeWidth('stroke-2')
  )

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 5L14 5C17.866 5 21 8.13401 21 12C21 15.866 17.866 19 14 19L11 19"
        className={commonPathStyles}
      />
      <circle
        cx="11"
        cy="12"
        r="7"
        transform="rotate(-90 11 12)"
        className={commonPathStyles}
      />
    </svg>
  )
}
