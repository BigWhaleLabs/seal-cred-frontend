import { CardColor } from 'components/CardContext'
import { CardDescription, CardHeader } from 'components/Text'
import TitleContainer from 'components/TitleContainer'

export default function ({
  title,
  subtitle,
  titleColor = 'accent',
}: {
  titleColor?: CardColor
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
