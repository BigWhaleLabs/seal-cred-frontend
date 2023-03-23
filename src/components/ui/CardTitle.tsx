import { useContext } from 'preact/hooks'
import CardContext from 'components/ui/CardContext'
import Title from 'components/ui/Title'

export default function ({
  subtitle,
  title,
}: {
  title: string
  subtitle: string
}) {
  const { cardColor } = useContext(CardContext)
  return <Title subtitle={subtitle} title={title} titleColor={cardColor} />
}
