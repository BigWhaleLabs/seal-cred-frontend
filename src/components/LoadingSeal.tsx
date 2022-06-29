import SealLoading from 'icons/SealLoading'
import classnames, {
  alignItems,
  display,
  flexGrow,
  justifyContent,
} from 'classnames/tailwind'

const centeredContrainer = classnames(
  display('flex'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  flexGrow('grow')
)

export default function () {
  return (
    <div className={centeredContrainer}>
      <SealLoading />
    </div>
  )
}
