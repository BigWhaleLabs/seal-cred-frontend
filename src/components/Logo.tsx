import { classnames } from 'classnames/tailwind'

const logoContainer = classnames('relative')
const colors = {
  layer: 'var(--accent)',
  gradientFrom: 'var(--logo-layer-gradient-from)',
  gradientTo: 'var(--logo-layer-gradient-to)',
}
const Logo = () => {
  return (
    <div className={logoContainer}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.3991 5.45026L28.4009 5.45128L34.0536 8.69945C35.7643 9.68245 36.8174 11.5065 36.8134 13.4795L36.8 19.999L36.8 20.001L36.8134 26.5205C36.8174 28.4935 35.7643 30.3175 34.0536 31.3006L28.4009 34.5487L28.3991 34.5497L22.7598 37.8211C21.0531 38.8111 18.9469 38.8111 17.2402 37.8211L11.6009 34.5497L11.5991 34.5487L5.94639 31.3006C4.23568 30.3175 3.18258 28.4935 3.18663 26.5205L3.2 20.001L3.2 19.999L3.18663 13.4795C3.18258 11.5065 4.23568 9.68245 5.94639 8.69945L11.5991 5.45129L11.6009 5.45026L17.2402 2.17894C18.9469 1.18893 21.0531 1.18893 22.7598 2.17894L28.3991 5.45026Z"
          fill={colors.layer}
          stroke="url(#paint0_linear_243_1209)"
        />
        <g filter="url(#filter0_d_243_1209)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25.77 21.5087L28.7462 23.3362C28.955 23.465 29.0825 23.6912 29.0825 23.9362C29.0825 24.1812 28.955 24.4075 28.7462 24.5362C26.93 25.6512 23.0437 28.0388 21.1225 29.22C20.4337 29.6425 19.5662 29.6425 18.8775 29.22C16.9562 28.0388 13.07 25.6512 11.2537 24.5362C11.045 24.4075 10.9175 24.1812 10.9175 23.9362C10.9175 23.6912 11.045 23.465 11.2537 23.3362L14.23 21.5087L18.5512 24.1638C19.44 24.7088 20.56 24.7088 21.4487 24.1638L25.77 21.5087ZM21.1225 11.1525C20.4337 10.73 19.5662 10.73 18.8775 11.1525C16.9562 12.3325 13.07 14.7212 11.2537 15.8362C11.045 15.965 10.9175 16.1912 10.9175 16.4362C10.9175 16.6812 11.045 16.9075 11.2537 17.0362C13.07 18.1512 16.9562 20.5388 18.8775 21.72C19.5662 22.1425 20.4337 22.1425 21.1225 21.72C23.0437 20.5388 26.93 18.1512 28.7462 17.0362C28.955 16.9075 29.0825 16.6812 29.0825 16.4362C29.0825 16.1912 28.955 15.965 28.7462 15.8362C26.93 14.7212 23.0437 12.3325 21.1225 11.1525Z"
            fill="url(#paint1_linear_243_1209)"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_243_1209"
            x="6"
            y="8"
            width="28"
            height="28"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_243_1209"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_243_1209"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_243_1209"
            x1="20"
            y1="0"
            x2="20"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={colors.gradientFrom} stopOpacity="0.27" />
            <stop offset="1" stopColor={colors.gradientTo} stopOpacity="0.42" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_243_1209"
            x1="25.4217"
            y1="11.9458"
            x2="13.0106"
            y2="25.0673"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0.75" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default Logo
