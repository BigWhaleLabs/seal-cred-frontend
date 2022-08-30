import classnames, { stroke, strokeWidth } from 'classnames/tailwind'

const stokeClasses = classnames(
  stroke('stroke-secondary'),
  strokeWidth('stroke-2')
)

export default function () {
  return (
    <svg
      width="91"
      height="90"
      viewBox="0 0 91 90"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_90_6722)">
        <circle cx="45.5" cy="44" r="36" className={stokeClasses} />
        <path
          d="M65.3609 50.7367C65.3609 61.7063 56.4683 70.5988 45.4988 70.5988C34.5293 70.5988 25.6367 61.7063 25.6367 50.7367C25.6367 39.7672 34.5293 50.7365 45.4988 50.7365C56.4683 50.7365 65.3609 39.7672 65.3609 50.7367Z"
          className={stokeClasses}
        />
        <path
          d="M25.639 33.3533C25.639 28.9495 29.1127 25.3795 33.3976 25.3795C37.6826 25.3795 41.1563 28.9495 41.1563 33.3533C41.1562 37.7571 37.6826 33.3534 33.3976 33.3534C29.1127 33.3534 25.639 37.7571 25.639 33.3533Z"
          className={stokeClasses}
        />
        <path
          d="M49.846 33.3533C49.846 28.9495 53.3197 25.3795 57.6047 25.3795C61.8896 25.3795 65.3633 28.9495 65.3633 33.3533C65.3633 37.7571 61.8896 33.3534 57.6047 33.3534C53.3197 33.3534 49.846 37.7571 49.846 33.3533Z"
          className={stokeClasses}
        />
        <path d="M31.2227 46.793L31.2227 64.1723" className={stokeClasses} />
        <path d="M36.1914 48.3457L36.1914 68.2078" className={stokeClasses} />
        <line
          x1="41.5352"
          y1="50.207"
          x2="41.5352"
          y2="70.6898"
          className={stokeClasses}
        />
        <path d="M46.1211 50.5176L46.1211 70.69" className={stokeClasses} />
        <path d="M51.0859 49.8965L51.0859 69.7586" className={stokeClasses} />
        <line
          x1="56.4297"
          y1="48.3457"
          x2="56.4297"
          y2="67.5871"
          className={stokeClasses}
        />
        <path d="M61.0156 45.8613L61.0156 63.2406" className={stokeClasses} />
      </g>
      <defs>
        <filter
          id="filter0_d_90_6722"
          x="0.5"
          y="0"
          width="90"
          height="90"
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
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.483333 0 0 0 0 0.929029 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_90_6722"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_90_6722"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}
