import { stroke, width } from 'classnames/tailwind'
import CommonIconsProps from 'icons/CommonIconsProps'

const strokeColor = (inheritStrokeColor?: boolean) =>
  stroke(inheritStrokeColor ? 'stroke-inherit' : 'stroke-formal-accent')

export default function ({ inheritStrokeColor }: CommonIconsProps) {
  return (
    <div className={width('w-full')}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 12">
        <path
          d="M0.625 1.125V8.625C0.625 9.86764 1.63236 10.875 2.875 10.875H11.125C12.3676 10.875 13.375 9.86764 13.375 8.625V1.125M0.625 1.125H13.375M0.625 1.125L5.51135 5.43649C6.3619 6.18697 7.6381 6.18697 8.48865 5.43649L13.375 1.125"
          className={strokeColor(inheritStrokeColor)}
          stroke-width="1.125"
        />
      </svg>
    </div>
  )
}
