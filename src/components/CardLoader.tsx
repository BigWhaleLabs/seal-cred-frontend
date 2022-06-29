import LoadingSeal from 'components/LoadingSeal'
import Title from 'components/Title'
import classnames, {
  display,
  flexDirection,
  height,
  textColor,
} from 'classnames/tailwind'

type Color = 'accent' | 'primary' | 'secondary' | 'tertiary' | 'formal-accent'
const loadingContainer = (color: Color) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    height('h-full'),
    textColor(
      color === 'accent'
        ? 'text-accent'
        : color === 'tertiary'
        ? 'text-tertiary'
        : color === 'secondary'
        ? 'text-secondary'
        : color === 'formal-accent'
        ? 'text-formal-accent'
        : color === 'primary'
        ? 'text-primary'
        : 'text-primary-dark'
    )
  )

export default function ({
  title,
  subtitle,
  color,
}: {
  color: Color
  title: string
  subtitle: string
}) {
  return (
    <div className={loadingContainer(color)}>
      <Title titleColor={color} title={title} subtitle={subtitle} />
      <LoadingSeal />
    </div>
  )
}
