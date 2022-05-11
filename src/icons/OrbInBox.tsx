import { FC } from 'react'

export enum OrbsColors {
  pink = '#ff7bed',
  green = '#01feb6',
  yellow = '#fed823',
}

const OrbInBox: FC<{ color: OrbsColors }> = ({ color }) => {
  return (
    <svg
      width="210"
      height="210"
      viewBox="0 0 210 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_90_6426)">
        <path
          d="M75 83C75 78.5817 78.5817 75 83 75H127C131.418 75 135 78.5817 135 83V127C135 131.418 131.418 135 127 135H83C78.5817 135 75 131.418 75 127V83Z"
          fill="#0D0030"
        />
        <path
          d="M75 83C75 78.5817 78.5817 75 83 75H127C131.418 75 135 78.5817 135 83V127C135 131.418 131.418 135 127 135H83C78.5817 135 75 131.418 75 127V83Z"
          stroke={color}
        />
      </g>
      <path
        d="M130 80V105V126C130 128.209 128.209 130 126 130H105M80 130V105V84C80 81.7909 81.7909 80 84 80H105"
        stroke={color}
      />
      <g filter="url(#filter1_d_90_6426)">
        <circle cx="105" cy="105" r="14" fill={color} />
      </g>
      <circle cx="105" cy="130" r="1" fill={color} />
      <circle cx="80" cy="130" r="1" fill={color} />
      <circle cx="105" cy="80" r="1" fill={color} />
      <circle cx="130" cy="80" r="1" fill={color} />
      <line x1="130" y1="101.5" x2="135" y2="101.5" stroke={color} />
      <line x1="75" y1="101.5" x2="80" y2="101.5" stroke={color} />
      <line x1="89.5" y1="75" x2="89.5" y2="80" stroke={color} />
      <line x1="121.5" y1="130" x2="121.5" y2="135" stroke={color} />
      <defs>
        <filter
          id="filter0_d_90_6426"
          x="0.5"
          y="0.5"
          width="209"
          height="209"
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
          <feGaussianBlur stdDeviation="37" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.00392157 0 0 0 0 0.996078 0 0 0 0 0.713726 0 0 0 1 0"
          />
          <feBlend
            mode="screen"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_90_6426"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_90_6426"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_90_6426"
          x="72"
          y="72"
          width="66"
          height="66"
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
          <feGaussianBlur stdDeviation="9.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.00392157 0 0 0 0 0.996078 0 0 0 0 0.713726 0 0 0 1 0"
          />
          <feBlend
            mode="screen"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_90_6426"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_90_6426"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default OrbInBox
