import { dropShadow, fill } from 'classnames/tailwind'

const starContainer = dropShadow('drop-shadow-accent')
const starPath = fill('fill-accent')

export default function () {
  return (
    <svg
      className={starContainer}
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={starPath}
        d="M9 0L10.9246 3.07682L14.2901 1.71885L14.0386 5.33927L17.5595 6.21885L15.228 9L17.5595 11.7812L14.0386 12.6607L14.2901 16.2812L10.9246 14.9232L9 18L7.07544 14.9232L3.70993 16.2812L3.96144 12.6607L0.440492 11.7812L2.772 9L0.440492 6.21885L3.96144 5.33927L3.70993 1.71885L7.07544 3.07682L9 0Z"
        fill="#FED823"
      />
    </svg>
  )
}
