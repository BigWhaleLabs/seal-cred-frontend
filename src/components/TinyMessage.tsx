import { TinyText } from 'components/Text'
import Exclamation from 'icons/Exclamation'
import classnames, {
  display,
  flex,
  flexDirection,
  space,
} from 'classnames/tailwind'

const svgContainer = classnames(display('flex'), flex('flex-1'))
const messageBlock = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-1')
)

export default function ({
  text,
  state,
  withIcon,
}: {
  text: string
  state?: 'base' | 'primary' | 'error'
  withIcon?: boolean
}) {
  return (
    <div className={messageBlock}>
      {withIcon && (
        <div className={svgContainer}>
          <Exclamation />
        </div>
      )}
      <TinyText primary color={state}>
        {text}
      </TinyText>
    </div>
  )
}
