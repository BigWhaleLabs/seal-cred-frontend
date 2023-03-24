import { useContext } from 'preact/hooks'
import CardContext from 'components/ui/CardContext'
import SealLoading from 'icons/SealLoading'
import Title from 'components/ui/Title'
import classnames, {
  alignItems,
  display,
  flexDirection,
  flexGrow,
  height,
  justifyContent,
} from 'classnames/tailwind'

const loaderContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  height('h-full')
)
const iconContainer = classnames(
  display('flex'),
  flexGrow('grow'),
  alignItems('items-center'),
  justifyContent('justify-center')
)

export default function ({
  subtitle,
  title,
}: {
  title: string
  subtitle: string
}) {
  const { cardColor } = useContext(CardContext)

  return (
    <div className={loaderContainer}>
      <Title subtitle={subtitle} title={title} titleColor={cardColor} />
      <div className={iconContainer}>
        <SealLoading color={cardColor} />
      </div>
    </div>
  )
}
