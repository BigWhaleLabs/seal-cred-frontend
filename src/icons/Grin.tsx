import classnames, { stroke, strokeWidth } from 'classnames/tailwind'

const stokeClasses = classnames(
  stroke('stroke-secondary'),
  strokeWidth('stroke-2')
)

export default function () {
  return (
    <svg
      height="90"
      viewBox="0 0 91 90"
      width="91"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_90_6722)">
        <circle className={stokeClasses} cx="45.5" cy="44" r="36" />
        <path
          className={stokeClasses}
          d="M65.3609 50.7367C65.3609 61.7063 56.4683 70.5988 45.4988 70.5988C34.5293 70.5988 25.6367 61.7063 25.6367 50.7367C25.6367 39.7672 34.5293 50.7365 45.4988 50.7365C56.4683 50.7365 65.3609 39.7672 65.3609 50.7367Z"
        />
        <path
          className={stokeClasses}
          d="M25.639 33.3533C25.639 28.9495 29.1127 25.3795 33.3976 25.3795C37.6826 25.3795 41.1563 28.9495 41.1563 33.3533C41.1562 37.7571 37.6826 33.3534 33.3976 33.3534C29.1127 33.3534 25.639 37.7571 25.639 33.3533Z"
        />
        <path
          className={stokeClasses}
          d="M49.846 33.3533C49.846 28.9495 53.3197 25.3795 57.6047 25.3795C61.8896 25.3795 65.3633 28.9495 65.3633 33.3533C65.3633 37.7571 61.8896 33.3534 57.6047 33.3534C53.3197 33.3534 49.846 37.7571 49.846 33.3533Z"
        />
        <path className={stokeClasses} d="M31.2227 46.793L31.2227 64.1723" />
        <path className={stokeClasses} d="M36.1914 48.3457L36.1914 68.2078" />
        <line
          className={stokeClasses}
          x1="41.5352"
          x2="41.5352"
          y1="50.207"
          y2="70.6898"
        />
        <path className={stokeClasses} d="M46.1211 50.5176L46.1211 70.69" />
        <path className={stokeClasses} d="M51.0859 49.8965L51.0859 69.7586" />
        <line
          className={stokeClasses}
          x1="56.4297"
          x2="56.4297"
          y1="48.3457"
          y2="67.5871"
        />
        <path className={stokeClasses} d="M61.0156 45.8613L61.0156 63.2406" />
      </g>
      <defs>
        <filter
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
          height="90"
          id="filter0_d_90_6722"
          width="90"
          x="0.5"
          y="0"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.483333 0 0 0 0 0.929029 0 0 0 1 0"
          />
          <feBlend
            in2="BackgroundImageFix"
            mode="normal"
            result="effect1_dropShadow_90_6722"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_90_6722"
            mode="normal"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}
