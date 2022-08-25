import { TinyText } from 'components/ui/Text'
import Exclamation from 'icons/Exclamation'
import classnames, { display, flexDirection, space } from 'classnames/tailwind'

const svgContainer = display('flex')
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
      <TinyText fontPrimary color={state}>
        {text}
      </TinyText>
    </div>
  )
}
