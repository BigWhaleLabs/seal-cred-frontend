import classnames, {
  backgroundColor,
  display,
  height,
  inset,
  justifyContent,
  margin,
  position,
  width,
  zIndex,
} from 'classnames/tailwind'

const svgBox = classnames(
  width('w-5/6'),
  margin('my-24'),
  position('relative'),
  display('flex'),
  justifyContent('justify-center')
)
const longLine = classnames(
  position('absolute'),
  inset('top-1/2'),
  width('w-full'),
  height('h-px'),
  backgroundColor('bg-accent'),
  zIndex('z-10')
)

export default function () {
  return (
    <div className={svgBox}>
      <div className={longLine} />
      <svg
        width="199"
        height="67"
        viewBox="0 0 199 67"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={zIndex('z-20')}
      >
        <circle
          cx="99.5"
          cy="33.5"
          r="32.5"
          fill="#0D0030"
          stroke="#FED823"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M99.5 59.9062C92.1484 59.9062 85.4985 56.902 80.7109 52.0543C76.0012 47.2853 73.0938 40.7322 73.0938 33.5C73.0938 26.2678 76.0012 19.7147 80.7109 14.9457M99.5 7.09375C106.852 7.09375 113.502 10.098 118.289 14.9457C122.999 19.7147 125.906 26.2678 125.906 33.5C125.906 40.7322 122.999 47.2853 118.289 52.0543"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <path
          d="M119.812 33.5C119.812 39.0361 117.598 44.0549 114.006 47.7188C110.319 51.4793 105.182 53.8125 99.5 53.8125C93.8178 53.8125 88.6805 51.4793 84.994 47.7188M79.1875 33.5C79.1875 27.8178 81.5207 22.6805 85.2812 18.994C88.9451 15.4022 93.9639 13.1875 99.5 13.1875C105.036 13.1875 110.055 15.4022 113.719 18.994"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <circle cx="99.5" cy="7.09375" r="1.01562" fill="#FED823" />
        <circle cx="81.2188" cy="14.2031" r="1.01562" fill="#FED823" />
        <circle cx="79.1875" cy="33.5" r="1.01562" fill="#FED823" />
        <circle cx="113.719" cy="19.2812" r="1.01562" fill="#FED823" />
        <circle cx="119.812" cy="33.5" r="1.01562" fill="#FED823" />
        <circle cx="85.2812" cy="47.7188" r="1.01562" fill="#FED823" />
        <circle cx="99.5" cy="59.9062" r="1.01562" fill="#FED823" />
        <circle cx="118.797" cy="51.7812" r="1.01562" fill="#FED823" />
        <line
          x1="67.5"
          y1="34.0156"
          x2="72.5938"
          y2="34.0156"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <circle cx="81.2188" cy="42.6406" r="1.01562" fill="#FED823" />
        <circle cx="117.781" cy="25.375" r="1.01562" fill="#FED823" />
        <line
          x1="71.2861"
          y1="47.5557"
          x2="81.5636"
          y2="42.417"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <line
          x1="118.005"
          y1="25.212"
          x2="128.282"
          y2="20.0733"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <line
          x1="67.5"
          y1="38.0781"
          x2="72.5938"
          y2="38.0781"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <line
          x1="126.406"
          y1="38.0781"
          x2="131.5"
          y2="38.0781"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <line
          x1="126.406"
          y1="29.9531"
          x2="131.5"
          y2="29.9531"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <line
          x1="67.5"
          y1="29.9531"
          x2="72.5938"
          y2="29.9531"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <line
          x1="126.406"
          y1="34.0156"
          x2="131.5"
          y2="34.0156"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <line
          x1="117.859"
          y1="43.981"
          x2="122.27"
          y2="46.5279"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <line
          x1="76.8236"
          y1="21.1295"
          x2="81.235"
          y2="23.6764"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <line
          x1="109.571"
          y1="15.651"
          x2="112.118"
          y2="11.2397"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <line
          x1="87.1295"
          y1="56.3756"
          x2="89.6764"
          y2="51.9643"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <line
          x1="59.5"
          y1="40.5"
          x2="0.5"
          y2="40.5"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <line
          x1="198.5"
          y1="40.5"
          x2="139.5"
          y2="40.5"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <line
          x1="59.5"
          y1="28.5"
          x2="0.5"
          y2="28.5"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <line
          x1="198.5"
          y1="28.5"
          x2="139.5"
          y2="28.5"
          stroke="#FED823"
          stroke-linecap="round"
        />
        <g filter="url(#filter0_d_90_6555)">
          <circle cx="99.5" cy="33.5" r="12.5" fill="#FED823" />
        </g>
        <defs>
          <filter
            id="filter0_d_90_6555"
            x="68"
            y="2"
            width="63"
            height="63"
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
              values="0 0 0 0 0.996078 0 0 0 0 0.847059 0 0 0 0 0.137255 0 0 0 1 0"
            />
            <feBlend
              mode="screen"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_90_6555"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_90_6555"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
