import classnames, {
  animation,
  fontWeight,
  letterSpacing,
  textColor,
  textTransform,
  transformOrigin,
} from 'classnames/tailwind'

const textBox = classnames(
  textTransform('uppercase'),
  fontWeight('font-semibold'),
  letterSpacing('tracking-arc'),
  textColor('text-secondary'),
  transformOrigin('origin-left')
)

const animate = animation('animate-rotate-slow')

export default function ({
  diameter = 200,
  text,
}: {
  text: string
  diameter?: number
}) {
  const chars = text.split('')
  // Add spaces to make text more readable
  chars.unshift(' ')
  chars.push(' ')

  // correct bad positioning caused by chars rotation
  const correctRotation = 28 + (diameter / 100) * 7

  const textLength = chars.length

  return (
    <div className={animate}>
      <div
        // using diameter/2 prevents overflow
        className={textBox}
        style={{
          fontSize: `${diameter / 10}px`,
          height: diameter,
          transform: `translateX(${correctRotation}%)`,
          width: diameter / 2,
        }}
      >
        {chars.map((char, index) => (
          <span
            style={{
              height: `${diameter}px`,
              position: 'absolute',
              transform: `rotate(${(360 / textLength) * index}deg)`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}
