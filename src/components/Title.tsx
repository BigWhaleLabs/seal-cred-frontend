import { CardDescription, CardHeader } from 'components/Text'
import Color from 'models/Color'
import TitleContainer from 'components/TitleContainer'

export default function ({
  title,
  subtitle,
  titleColor = 'accent',
}: {
  titleColor?: Color
  title: string
  subtitle: string
}) {
  return (
    <TitleContainer>
      <CardHeader color={titleColor}>{title}</CardHeader>
      <CardDescription>{subtitle}</CardDescription>
    </TitleContainer>
  )
}
