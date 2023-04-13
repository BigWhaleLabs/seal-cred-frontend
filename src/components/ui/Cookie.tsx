import { AccentText, CookieText } from 'components/ui/Text'
import { useSnapshot } from 'valtio'
import Button from 'components/ui/Button'
import NotificationsStore from 'stores/NotificationsStore'
import classnames, {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  boxShadowColor,
  display,
  flexDirection,
  gap,
  inset,
  margin,
  maxWidth,
  padding,
  position,
  space,
  zIndex,
} from 'classnames/tailwind'

const basicCardStyles = classnames(
  display('flex'),
  flexDirection('flex-col'),
  position('fixed'),
  inset(
    'left-4',
    'right-4',
    'bottom-3',
    'sm:left-auto',
    'sm:right-5',
    'sm:bottom-24',
    'md:right-14',
    'md:bottom-10',
    'smToXl:right-25'
  ),
  gap('gap-y-3', 'sm:gap-y-6'),
  backgroundColor('bg-primary-dark'),
  padding('p-6'),
  borderRadius('rounded-2xl'),
  borderWidth('border'),
  borderColor('border-primary'),
  boxShadow('shadow-2xl'),
  boxShadowColor('shadow-primary-semi-transparent'),
  maxWidth('max-w-full', 'sm:max-w-cookie'),
  zIndex('z-50')
)
const button = (small?: boolean) =>
  classnames(
    margin(small ? 'mx-auto' : 'mr-auto'),
    small ? display('sm:hidden') : display('hidden', 'sm:block')
  )

const CookieButton = ({
  callback,
  small,
}: {
  small?: boolean
  callback: () => void
}) => (
  <Button small={small} type="primary" onClick={callback}>
    Got it
  </Button>
)

export default function () {
  const { showCookie } = useSnapshot(NotificationsStore)
  const closeCookie = () => (NotificationsStore.showCookie = false)

  if (!showCookie) return null

  return (
    <div className={basicCardStyles}>
      <div className={space('space-y-2')}>
        <AccentText color="text-primary">Yum...cookies! 🍪</AccentText>
        <CookieText>
          We use cookies for crucial functions but we don't track you
        </CookieText>
      </div>
      <div className={button(true)}>
        <CookieButton small callback={closeCookie} />
      </div>
      <div className={button()}>
        <CookieButton callback={closeCookie} />
      </div>
    </div>
  )
}
