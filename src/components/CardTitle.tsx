import { useContext } from 'preact/hooks'
import CardContext from 'components/CardContext'
import Title from 'components/Title'

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
