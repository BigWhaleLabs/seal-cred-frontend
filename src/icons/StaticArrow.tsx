export default function ({ turnUp }: { turnUp?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g
        filter="url(#filter0_d_1253_5042)"
        transform={turnUp ? 'rotate(180 8 8)' : undefined}
      >
        <path
          d="M13 6L8 11L3 6"
          stroke="url(#paint0_linear_1253_5042)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1253_5042"
          x="-5"
          y="-2"
          width="26"
          height="21"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1253_5042"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1253_5042"
          x1="8"
          y1="5.44444"
          x2="8"
          y2="11"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF7BED" />
          <stop offset="1" stop-color="#FED823" />
        </linearGradient>
      </defs>
    </svg>
  )
}
