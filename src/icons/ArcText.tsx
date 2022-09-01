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
  text,
  diameter = 200,
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
        style={{
          width: diameter / 2,
          height: diameter,
          fontSize: `${diameter / 10}px`,
          transform: `translateX(${correctRotation}%)`,
        }}
        className={textBox}
      >
        {chars.map((char, index) => (
          <span
            style={{
              height: `${diameter}px`,
              transform: `rotate(${(360 / textLength) * index}deg)`,
              position: 'absolute',
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}
