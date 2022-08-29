import Color from 'models/Color'
import classnames, { fill, stroke, strokeWidth } from 'classnames/tailwind'
import colorToDropShadow from 'helpers/colors/colorToDropShadow'
import colorToTextColor from 'helpers/colors/colorToTextColor'

export default function ({ color }: { color: Color }) {
  const textColor = colorToTextColor(color)
  const shadowColor = colorToDropShadow(color)
  const strokeStyles = classnames(
    stroke('stroke-current'),
    strokeWidth('stroke-2')
  )
  const circleStyles = classnames(strokeStyles, fill('fill-primary-dark'))

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="202"
      height="202"
      viewBox="0 0 202 202"
      fill="none"
      className={classnames(textColor, shadowColor)}
    >
      <circle cx="101" cy="101" r="66" className={circleStyles} />
      <path
        d="M152.097 142.516V101C152.097 72.7801 129.22 49.9033 101 49.9033C72.7801 49.9033 49.9033 72.7801 49.9033 101V142.516"
        className={strokeStyles}
      />
      <path
        d="M100.999 111.645C105.115 111.645 108.451 112.138 108.451 107.418C108.451 102.697 105.115 98.8708 100.999 98.8708C96.884 98.8708 93.5478 102.697 93.5478 107.418C93.5478 112.138 96.884 111.645 100.999 111.645ZM100.999 111.645C100.999 114.484 100.999 120.8 100.999 123.355M100.999 123.355C100.999 131.871 111.645 131.871 111.645 123.355M100.999 123.355C100.999 131.871 90.3542 131.871 90.3542 123.355"
        className={strokeStyles}
      />
      <path d="M135.064 111.645L122.29 113.774" className={strokeStyles} />
      <path d="M122.29 120.161L135.064 122.29" className={strokeStyles} />
      <path d="M66.9348 111.645L79.709 113.774" className={strokeStyles} />
      <path d="M79.7088 120.161L66.9346 122.29" className={strokeStyles} />
      <path
        d="M91 83C91 77.4772 86.5228 73 81 73C75.4772 73 71 77.4772 71 83C71 88.5228 75.4772 93 81 93"
        className={strokeStyles}
      >
        <animateTransform
          attributeName="transform"
          begin="0s"
          dur="1s"
          type="rotate"
          from="0 81 83"
          to="360 81 83"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M109.34 85.5882C110.77 90.9228 116.253 94.0887 121.588 92.6592C126.922 91.2298 130.088 85.7464 128.659 80.4118C127.229 75.0771 121.746 71.9113 116.411 73.3407"
        className={strokeStyles}
      >
        <animateTransform
          attributeName="transform"
          begin="0s"
          dur="1s"
          type="rotate"
          from="0 119 83"
          to="360 119 83"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M124.098 81.634C123.344 78.8185 120.45 77.1477 117.634 77.9021C114.819 78.6565 113.148 81.5505 113.902 84.366C114.657 87.1816 117.551 88.8524 120.366 88.098"
        className={strokeStyles}
      >
        <animateTransform
          attributeName="transform"
          begin="0s"
          dur="1s"
          type="rotate"
          from="0 119 83"
          to="360 119 83"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M76.0001 83.2779C76.0001 86.1927 78.363 88.5557 81.2779 88.5557C84.1927 88.5557 86.5557 86.1927 86.5557 83.2779C86.5557 80.363 84.1927 78.0001 81.2779 78.0001"
        className={strokeStyles}
      >
        <animateTransform
          attributeName="transform"
          begin="0s"
          dur="1s"
          type="rotate"
          from="0 81 83"
          to="360 81 83"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  )
}
