import { BodyText, Link } from 'components/Text'
import {
  alignItems,
  backgroundColor,
  borderColor,
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

const wrapper = classnames(
  position('sticky'),
  display('flex'),
  flexDirection('flex-col', 'md:flex-row'),
  alignItems('items-center'),
  justifyContent('justify-between'),
  container('container'),

  maxWidth('max-w-4xl'),
  margin('mx-auto'),
  inset('sm:bottom-2', 'bottom-1'),
  padding('py-2', 'px-4'),

  borderWidth('border'),
  borderRadius('rounded-2xl'),
  borderColor('border-primary-dimmed'),
  backgroundColor('bg-semi-background'),

  transitionProperty('transition-colors'),
  space('space-y-2', 'md:space-y-0'),
  zIndex('z-10')
)

const SafariAttention = () => {
  const { warningAccepted } = useSnapshot(AppStore)

  return !warningAccepted ? (
    <div className={wrapper}>
      <BodyText center>
        🧭 Safari may work unstable. We recommend using the Chromium browser
        instead.
      </BodyText>
      <Link url="#" onClick={() => (AppStore.warningAccepted = true)}>
        Close
      </Link>
    </div>
  ) : null
}

export default SafariAttention
