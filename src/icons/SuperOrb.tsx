import classnames, { brightness, dropShadow } from 'classnames/tailwind'

const orbStyles = classnames(
  brightness('brightness-125'),
  dropShadow('drop-shadow-white')
)

export default function SuperOrb() {
  return (
    <div style={{ width: '106px', height: '80px' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 107.21 88.48"
        className={orbStyles}
      >
        <defs>
          <mask
            id="a"
            x="8.78"
            y="1"
            width="80.22"
            height="82.87"
            maskUnits="userSpaceOnUse"
          >
            <g transform="translate(-1 -13)">
              <circle cx="54.5" cy="54.5" r="30.5" fill="#c4c4c4" />
            </g>
          </mask>
          <radialGradient
            id="b"
            cx="-895.94"
            cy="621.41"
            r="1"
            gradientTransform="matrix(-5.91, 36.3, 36.3, 5.91, -27789.22, 28887.04)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#31b5ff" />
            <stop offset="1" stop-color="#ff87c8" />
          </radialGradient>
          <radialGradient
            id="c"
            cx="-879.89"
            cy="610.92"
            r="1"
            gradientTransform="matrix(16.97, 30.07, 30.07, -16.97, -3398.69, 36849.64)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#5200ff" />
            <stop offset="1" stop-color="#fff" stop-opacity="0" />
          </radialGradient>
          <radialGradient
            id="d"
            cx="-909.72"
            cy="637"
            r="1"
            gradientTransform="matrix(-11.17, 16.86, 20.29, 13.44, -23004.13, 6806.6)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#fff" />
            <stop offset="1" stop-color="#fff" stop-opacity="0" />
          </radialGradient>
          <mask
            id="e"
            x="23"
            y="11"
            width="84.21"
            height="77.48"
            maskUnits="userSpaceOnUse"
          >
            <g transform="translate(-1 -13)">
              <circle cx="54.5" cy="54.5" r="30.5" fill="#fff" />
            </g>
          </mask>
          <radialGradient
            id="f"
            cx="-899.02"
            cy="625.02"
            r="1"
            gradientTransform="matrix(-9.88, 33.4, 32.11, 9.5, -28898.9, 24126.55)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.62" stop-color="#fff" stop-opacity="0" />
            <stop offset="0.8" stop-color="#fff" stop-opacity="0" />
            <stop offset="1" stop-color="#fff" />
          </radialGradient>
          <radialGradient
            id="g"
            cx="-874.85"
            cy="597.6"
            r="1"
            gradientTransform="matrix(19.8, 9.86, 14.4, -16.39, 8785.89, 18481.58)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#ffe600" />
            <stop offset="1" stop-color="#ffe600" stop-opacity="0" />
          </radialGradient>
          <radialGradient
            id="h"
            cx="-877.35"
            cy="645.6"
            gradientTransform="matrix(0, 17.54, 17.89, 0, -11476.53, 15405.52)"
            xlinkHref="#d"
          />
          <radialGradient
            id="i"
            cx="-885.16"
            cy="631.33"
            gradientTransform="matrix(0, 24.44, 24.91, 0, -15691.99, 21708.97)"
            xlinkHref="#d"
          />
        </defs>
        <circle
          cx="53"
          cy="41"
          r="40"
          fill="#0d0030"
          stroke="#efecd6"
          stroke-linecap="round"
          stroke-width="2"
        />
        <g mask="url(#a)">
          <circle cx="53.5" cy="41.5" r="30.5" fill="url(#b)" />
          <circle cx="53.5" cy="41.5" r="30.5" fill="url(#c)" />
          <circle cx="53.5" cy="41.5" r="30.5" fill="url(#d)" />
          <g mask="url(#e)">
            <circle cx="53.5" cy="41.5" r="30.5" fill="url(#f)" />
            <polygon
              points="39 68.76 67.61 36.2 107.21 55.91 78.6 88.47 39 68.76"
              fill="url(#g)"
            />
          </g>
          <rect x="53.47" y="1" width="35.53" height="35.08" fill="url(#h)" />
          <path
            d="M9.78,48H59.26V96.87H9.78Z"
            transform="translate(-1 -13)"
            fill="url(#i)"
          />
        </g>
        <path
          d="M55,77A23,23,0,0,1,38.63,37.84M55,31A23,23,0,0,1,71.37,70.16"
          transform="translate(-1 -13)"
          fill="none"
          stroke="#efecd6"
          stroke-linecap="round"
          stroke-width="2"
        />
        <path
          d="M40,54A15,15,0,0,1,65.54,43.33M70,54A15,15,0,0,1,44.46,64.67"
          transform="translate(-1 -13)"
          fill="none"
          stroke="#efecd6"
          stroke-linecap="round"
          stroke-width="2"
        />
        <path
          d="M55,47a7,7,0,0,1,5,11.92M55,61a7,7,0,0,1-5-11.92"
          transform="translate(-1 -13)"
          fill="none"
          stroke="#efecd6"
          stroke-linecap="round"
          stroke-width="2"
        />
        <line
          x1="0.5"
          y1="46.5"
          x2="25.5"
          y2="46.5"
          fill="none"
          stroke="#efecd6"
          stroke-linecap="round"
        />
        <line
          x1="80.5"
          y1="46.5"
          x2="105.5"
          y2="46.5"
          fill="none"
          stroke="#efecd6"
          stroke-linecap="round"
        />
        <line
          x1="0.5"
          y1="38.5"
          x2="25.5"
          y2="38.5"
          fill="none"
          stroke="#efecd6"
          stroke-linecap="round"
        />
        <line
          x1="80.5"
          y1="38.5"
          x2="105.5"
          y2="38.5"
          fill="none"
          stroke="#efecd6"
          stroke-linecap="round"
        />
      </svg>
    </div>
  )
}
