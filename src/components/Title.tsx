import { CardDescription, CardHeader } from 'components/Text'
import TitleContainer from 'components/TitleContainer'

export default function ({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <TitleContainer>
      <CardHeader color="text-accent">{title}</CardHeader>
      <CardDescription>{subtitle}</CardDescription>
    </TitleContainer>
  )
}
