import { useContext } from 'preact/hooks'
import CardContext from 'components/ui/CardContext'
import Title from 'components/ui/Title'

export default function ({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  const { cardColor } = useContext(CardContext)
  return <Title titleColor={cardColor} title={title} subtitle={subtitle} />
}
