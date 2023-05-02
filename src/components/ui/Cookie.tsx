import { AccentText, CookieText } from 'components/ui/Text'
import { useSnapshot } from 'valtio'
import CookieButton from 'components/ui/CookieButton'
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
    'left-1',
    'right-1',
    'bottom-3',
    'sm:left-auto',
    'sm:right-5',
    'md:right-14',
    'md:bottom-10',
    'smToXl:right-25'
  ),
  gap('gap-y-3', 'sm:gap-y-6'),
  backgroundColor('bg-primary-dark'),
  padding('p-4', 'sm:p-6'),
  borderRadius('rounded-2xl'),
  borderWidth('border'),
  borderColor('border-primary'),
  boxShadow('shadow-2xl'),
  boxShadowColor('shadow-primary-semi-transparent'),
  maxWidth('max-w-full', 'sm:max-w-cookie'),
  zIndex('z-50')
)
const buttons = (small?: boolean) =>
  classnames(
    margin(small ? 'mx-auto' : 'mr-auto'),
    small ? display('sm:hidden') : display('hidden', 'sm:block')
  )

export default function () {
  const { showCookie } = useSnapshot(NotificationsStore)
  const closeCookie = () => (NotificationsStore.showCookie = false)

  if (!showCookie) return null

  return (
    <div className={basicCardStyles}>
      <div className={space('space-y-2')}>
        <AccentText color="text-primary">
          Yum<span className={padding('px-0.5')}>...</span>cookies! 🍪
        </AccentText>
        <CookieText>
          We use cookies for crucial functions but we don't track you
        </CookieText>
      </div>
      <div className={buttons(true)}>
        <CookieButton small callback={closeCookie} />
      </div>
      <div className={buttons()}>
        <CookieButton callback={closeCookie} />
      </div>
    </div>
  )
}
