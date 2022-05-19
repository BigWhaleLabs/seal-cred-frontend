import { dropShadow, fill } from 'classnames/tailwind'

const starContainer = dropShadow('drop-shadow-accent')
const starPath = fill('fill-accent')

export default function () {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={starContainer}
    >
      <path
        d="m8.5595,0l1.9246,3.0768l3.3655,-1.358l-0.2515,3.6205l3.5209,0.8795l-2.3315,2.7812l2.3315,2.7812l-3.5209,0.8795l0.2515,3.6205l-3.3655,-1.358l-1.9246,3.0768l-1.9246,-3.0768l-3.3655,1.358l0.2515,-3.6205l-3.5209,-0.8795l2.3315,-2.7812l-2.3315,-2.7812l3.5209,-0.8795l-0.2515,-3.6205l3.3655,1.358l1.9246,-3.0768z"
        className={starPath}
      />
    </svg>
  )
}
