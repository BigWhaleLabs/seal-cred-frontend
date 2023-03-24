import classnames, {
  backgroundColor,
  display,
  fill,
  height,
  inset,
  justifyContent,
  margin,
  position,
  stroke,
  strokeWidth,
  width,
  zIndex,
} from 'classnames/tailwind'

const svgBox = classnames(
  width('w-screen-80'),
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
const strokeColor = stroke('stroke-accent')
const fillColor = fill('fill-accent')
const circleClasses = classnames(
  stroke('stroke-accent'),
  strokeWidth('stroke-2'),
  fill('fill-primary-dark')
)

export default function () {
  return (
    <div className={svgBox}>
      <div className={longLine} />
      <svg
        className={zIndex('z-20')}
        height="67"
        viewBox="0 0 199 67"
        width="199"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className={circleClasses} cx="99.5" cy="33.5" r="32.5" />
        <path
          className={strokeColor}
          d="M99.5 59.9062C92.1484 59.9062 85.4985 56.902 80.7109 52.0543C76.0012 47.2853 73.0938 40.7322 73.0938 33.5C73.0938 26.2678 76.0012 19.7147 80.7109 14.9457M99.5 7.09375C106.852 7.09375 113.502 10.098 118.289 14.9457C122.999 19.7147 125.906 26.2678 125.906 33.5C125.906 40.7322 122.999 47.2853 118.289 52.0543"
        />
        <path
          className={strokeColor}
          d="M119.812 33.5C119.812 39.0361 117.598 44.0549 114.006 47.7188C110.319 51.4793 105.182 53.8125 99.5 53.8125C93.8178 53.8125 88.6805 51.4793 84.994 47.7188M79.1875 33.5C79.1875 27.8178 81.5207 22.6805 85.2812 18.994C88.9451 15.4022 93.9639 13.1875 99.5 13.1875C105.036 13.1875 110.055 15.4022 113.719 18.994"
        />
        <circle className={fillColor} cx="99.5" cy="7.09375" r="1.01562" />
        <circle className={fillColor} cx="81.2188" cy="14.2031" r="1.01562" />
        <circle className={fillColor} cx="79.1875" cy="33.5" r="1.01562" />
        <circle className={fillColor} cx="113.719" cy="19.2812" r="1.01562" />
        <circle className={fillColor} cx="119.812" cy="33.5" r="1.01562" />
        <circle className={fillColor} cx="85.2812" cy="47.7188" r="1.01562" />
        <circle className={fillColor} cx="99.5" cy="59.9062" r="1.01562" />
        <circle className={fillColor} cx="118.797" cy="51.7812" r="1.01562" />
        <line
          className={strokeColor}
          x1="67.5"
          x2="72.5938"
          y1="34.0156"
          y2="34.0156"
        />
        <circle className={fillColor} cx="81.2188" cy="42.6406" r="1.01562" />
        <circle className={fillColor} cx="117.781" cy="25.375" r="1.01562" />
        <line
          className={strokeColor}
          x1="71.2861"
          x2="81.5636"
          y1="47.5557"
          y2="42.417"
        />
        <line
          className={strokeColor}
          x1="118.005"
          x2="128.282"
          y1="25.212"
          y2="20.0733"
        />
        <line
          className={strokeColor}
          x1="67.5"
          x2="72.5938"
          y1="38.0781"
          y2="38.0781"
        />
        <line
          className={strokeColor}
          x1="126.406"
          x2="131.5"
          y1="38.0781"
          y2="38.0781"
        />
        <line
          className={strokeColor}
          x1="126.406"
          x2="131.5"
          y1="29.9531"
          y2="29.9531"
        />
        <line
          className={strokeColor}
          x1="67.5"
          x2="72.5938"
          y1="29.9531"
          y2="29.9531"
        />
        <line
          className={strokeColor}
          x1="126.406"
          x2="131.5"
          y1="34.0156"
          y2="34.0156"
        />
        <line
          className={strokeColor}
          x1="117.859"
          x2="122.27"
          y1="43.981"
          y2="46.5279"
        />
        <line
          className={strokeColor}
          x1="76.8236"
          x2="81.235"
          y1="21.1295"
          y2="23.6764"
        />
        <line
          className={strokeColor}
          x1="109.571"
          x2="112.118"
          y1="15.651"
          y2="11.2397"
        />
        <line
          className={strokeColor}
          x1="87.1295"
          x2="89.6764"
          y1="56.3756"
          y2="51.9643"
        />
        <line className={strokeColor} x1="59.5" x2="0.5" y1="40.5" y2="40.5" />
        <line
          className={strokeColor}
          x1="198.5"
          x2="139.5"
          y1="40.5"
          y2="40.5"
        />
        <line className={strokeColor} x1="59.5" x2="0.5" y1="28.5" y2="28.5" />
        <line
          className={strokeColor}
          x1="198.5"
          x2="139.5"
          y1="28.5"
          y2="28.5"
        />
        <g filter="url(#filter0_d_90_6555)">
          <circle className={fillColor} cx="99.5" cy="33.5" r="12.5" />
        </g>
        <defs>
          <filter
            color-interpolation-filters="sRGB"
            filterUnits="userSpaceOnUse"
            height="63"
            id="filter0_d_90_6555"
            width="63"
            x="68"
            y="2"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="9.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.996078 0 0 0 0 0.847059 0 0 0 0 0.137255 0 0 0 1 0"
            />
            <feBlend
              in2="BackgroundImageFix"
              mode="screen"
              result="effect1_dropShadow_90_6555"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_90_6555"
              mode="normal"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
