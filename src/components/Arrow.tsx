import { FC } from 'react'
import classnames, { animation } from 'classnames/tailwind'

const arrowAnimation = (disabled?: boolean) =>
  classnames(animation(disabled ? undefined : 'animate-pulse-horizontal'))

interface ArrowProps {
  disabled?: boolean
  flip?: boolean
}

const Arrow: FC<ArrowProps> = ({ disabled, flip }) => (
  <svg
    width="21"
    height="25"
    viewBox="-4 0 21 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={arrowAnimation(disabled)}
  >
    <g
      filter="url(#filter0_d_97_51757)"
      transform={flip ? 'rotate(90 10 10)' : undefined}
    >
      <path
        d="M8 8L12.5 12.5L8 17"
        stroke="url(#paint0_linear_97_51757)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_97_51757"
        x="0"
        y="0"
        width="20.5"
        height="25"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="3.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0.482353 0 0 0 0 0.929412 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_97_51757"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_97_51757"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_97_51757"
        x1="8.10547"
        y1="14.8571"
        x2="12.5"
        y2="14.8571"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FF7BED" />
        <stop offset="1" stop-color="#FED823" />
      </linearGradient>
    </defs>
  </svg>
)

export default Arrow
