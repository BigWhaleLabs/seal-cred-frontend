import classnames, {
  borderRadius,
  boxShadow,
  boxShadowColor,
} from 'classnames/tailwind'

const smileGlow = classnames(
  boxShadow('shadow-lg'),
  boxShadowColor('shadow-secondary-semi-transparent'),
  borderRadius('rounded-full')
)

export default function () {
  return (
    <svg
      width="42"
      height="43"
      viewBox="0 0 42 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={smileGlow}
    >
      <circle cx="21" cy="21.5" r="20" stroke="#FF7BED" stroke-width="2" />
      <path
        d="M29.75 26.2172C29.75 31.2059 25.8325 35.25 21 35.25C16.1675 35.25 12.25 31.2059 12.25 26.2172C12.25 21.2285 16.1675 26.2171 21 26.2171C25.8325 26.2171 29.75 21.2285 29.75 26.2172Z"
        stroke="#FF7BED"
        stroke-width="2"
      />
      <path
        d="M9.9672 15.9302C9.9672 13.4837 11.897 11.5003 14.2775 11.5003C16.6581 11.5003 18.5879 13.4837 18.5879 15.9302C18.5879 18.3768 16.6581 15.9303 14.2775 15.9303C11.897 15.9303 9.9672 18.3768 9.9672 15.9302Z"
        stroke="#FF7BED"
        stroke-width="2"
      />
      <path
        d="M23.4145 15.9302C23.4145 13.4837 25.3443 11.5003 27.7248 11.5003C30.1053 11.5003 32.0352 13.4837 32.0352 15.9302C32.0352 18.3768 30.1053 15.9303 27.7248 15.9303C25.3443 15.9303 23.4145 18.3768 23.4145 15.9302Z"
        stroke="#FF7BED"
        stroke-width="2"
      />
    </svg>
  )
}
