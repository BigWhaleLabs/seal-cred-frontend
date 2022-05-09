import { FC } from 'react'
import classnames, { fill, stroke } from 'classnames/tailwind'

type StrokeColor = 'pink' | 'yellow' | 'green'

const strokeColor = (color?: StrokeColor) =>
  classnames(
    stroke(
      color === 'pink'
        ? 'stroke-pink'
        : color === 'yellow'
        ? 'stroke-yellow'
        : color === 'green'
        ? 'stroke-green'
        : 'stroke-white'
    )
  )

const BadgeIcon: FC<{ color?: StrokeColor }> = ({ color }) => {
  return (
    <svg
      width="65"
      height="64"
      viewBox="0 0 65 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="32.5"
        cy="32"
        r="31"
        stroke-width="2"
        stroke-linecap="round"
        className={classnames(strokeColor(color), fill('fill-blue-900'))}
      />
      <path
        d="M56.5 51.5V32C56.5 18.7452 45.7548 8 32.5 8C19.2452 8 8.5 18.7452 8.5 32V51.5"
        stroke-width="2"
        stroke-linecap="round"
        className={strokeColor(color)}
      />
      <path
        d="M37.4989 27.3158C37.4989 24.3799 39.8147 21.9999 42.6713 21.9999C45.528 21.9999 47.8438 24.3799 47.8438 27.3158C47.8437 30.2516 45.528 27.3158 42.6713 27.3158C39.8147 27.3158 37.4989 30.2516 37.4989 27.3158Z"
        stroke-width="2"
        stroke-linecap="round"
        className={strokeColor(color)}
      />
      <path
        d="M17.4989 27.3158C17.4989 24.3799 19.8147 21.9999 22.6713 21.9999C25.528 21.9999 27.8438 24.3799 27.8438 27.3158C27.8437 30.2516 25.528 27.3158 22.6713 27.3158C19.8147 27.3158 17.4989 30.2516 17.4989 27.3158Z"
        stroke-width="2"
        stroke-linecap="round"
        className={strokeColor(color)}
      />
      <path
        d="M32.5 37C34.433 37 36 37.2317 36 35.0145C36 32.7973 34.433 30.9999 32.5 30.9999C30.567 30.9999 29 32.7973 29 35.0145C29 37.2317 30.567 37 32.5 37ZM32.5 37C32.5 38.3333 32.5 38.8 32.5 40"
        stroke-width="2"
        stroke-linecap="round"
        className={strokeColor(color)}
      />
      <path
        d="M27.4989 46.3161C27.4989 43.3802 29.8147 41.0002 32.6713 41.0002C35.528 41.0002 37.8438 43.3802 37.8438 46.3161C37.8438 49.2519 35.528 51.5005 32.6713 51.5005C29.8147 51.5005 27.4989 49.2519 27.4989 46.3161Z"
        stroke-width="2"
        stroke-linecap="round"
        className={strokeColor(color)}
      />
      <path
        d="M48.5 37L42.5 38"
        stroke-width="2"
        stroke-linecap="round"
        className={strokeColor(color)}
      />
      <path
        d="M42.5 41L48.5 42"
        stroke-width="2"
        stroke-linecap="round"
        className={strokeColor(color)}
      />
      <path
        d="M16.5 37L22.5 38"
        stroke-width="2"
        stroke-linecap="round"
        className={strokeColor(color)}
      />
      <path
        d="M22.5 41L16.5 42"
        stroke-width="2"
        stroke-linecap="round"
        className={strokeColor(color)}
      />
    </svg>
  )
}

export default BadgeIcon
