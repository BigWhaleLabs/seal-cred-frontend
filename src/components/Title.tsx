import { CardColor, CardDescription, CardHeader } from 'components/Text'
import TitleContainer from 'components/TitleContainer'

export default function ({
  title,
  subtitle,
  titleColor,
}: {
  title: string
  subtitle: string
  titleColor: CardColor
}) {
  return (
    <TitleContainer>
      <CardHeader color={titleColor}>{title}</CardHeader>
      <CardDescription>{subtitle}</CardDescription>
    </TitleContainer>
  )
}
