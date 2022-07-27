import classnames, {
  fill,
  fontSize,
  fontWeight,
  height,
  letterSpacing,
  margin,
  padding,
  textTransform,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const textStyle = (thinText?: boolean) =>
  classnames(
    fill('fill-secondary'),
    textTransform('uppercase'),
    fontWeight('font-semibold'),
    thinText ? fontSize('text-2xl') : fontSize('text-3xl'),
    letterSpacing('tracking-arc')
  )

const svgBox = (mobile?: boolean) =>
  classnames(
    height('md:h-64', 'h-44'),
    margin('mx-auto'),
    mobile ? padding('pr-2.5', 'md:pr-0') : undefined
  )

interface ArcTextProps {
  text: string
  smallCircle?: boolean
  thinText?: boolean
}

export default function ({ text, smallCircle, thinText }: ArcTextProps) {
  const { xxs, sm, md } = useBreakpoints()
  const mobile = (xxs || sm) && !md
  const radius = mobile ? 85 : smallCircle ? 110 : 55

  const textLength = text.length
  const longText = textLength > 35

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={
        mobile ? '0 0 475 475' : xxs && !md ? '0 0 450 450' : '0 0 500 500'
      }
      className={svgBox(mobile)}
    >
      <title>{text}</title>
      <defs>
        <path
          d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
          id="textcircle"
        >
          <animateTransform
            attributeName="transform"
            begin="0s"
            dur="30s"
            type="rotate"
            from="0 250 250"
            to="360 250 250"
            repeatCount="indefinite"
          />
        </path>
      </defs>
      <use transform="rotate(90 250 250)" />
      <use transform="rotate(45 250 250)" />
      <use transform="rotate(-45 250 250)" />
      <text
        dy={radius}
        textLength={longText ? textLength * textLength - 300 : textLength * 35}
        className={textStyle(thinText)}
        letter-spacing={(radius * 3.14) / 10}
      >
        <textPath xlinkHref="#textcircle">{text}</textPath>
      </text>
    </svg>
  )
}
