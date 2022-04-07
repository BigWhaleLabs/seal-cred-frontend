import { BodyText } from 'components/Text'
import {
  alignItems,
  backgroundColor,
  borderRadius,
  borderWidth,
  classnames,
  container,
  display,
  flexDirection,
  inset,
  justifyContent,
  margin,
  maxWidth,
  padding,
  position,
  space,
  transitionProperty,
  zIndex,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Button from 'components/Button'
import Theme from 'models/Theme'

const wrapper = (theme: Theme) =>
  classnames(
    position('sticky'),
    display('flex'),
    flexDirection('flex-col', 'md:flex-row'),
    alignItems('items-center'),
    justifyContent('justify-between'),
    container('container'),

    maxWidth('max-w-4xl'),
    margin('mx-auto'),
    inset('sm:bottom-2', 'bottom-1'),
    padding('py-3', 'px-4'),

    borderWidth(theme === 'dark' ? 'border-0' : 'border'),
    borderRadius('rounded-2xl'),
    backgroundColor(theme === 'dark' ? 'bg-border' : 'bg-semi-background'),

    transitionProperty('transition-colors'),
    space('space-y-2', 'md:space-y-0'),
    zIndex('z-10')
  )

const wide = classnames(padding('py-1', 'px-1'))

const SafariAttention = () => {
  const { theme, warningAccepted } = useSnapshot(AppStore)

  return (
    !warningAccepted && (
      <div className={wrapper(theme)}>
        <BodyText center>
          🍺 Safari and web3 don't mix well. Please, use a different browser.
        </BodyText>
        <Button
          badge
          color="primary"
          onClick={() => {
            AppStore.warningAccepted = true
          }}
        >
          <div className={wide}>Close</div>
        </Button>
      </div>
    )
  )
}

export default SafariAttention
