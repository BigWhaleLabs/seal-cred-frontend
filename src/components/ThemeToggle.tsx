import { classnames } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Theme from 'models/Theme'

const toggleContainer = (theme: Theme) =>
  classnames(
    'flex',
    'justify-center',
    'items-center',
    'justify-between',
    'py-0.5',
    'px-2',
    'border',
    'rounded-3xl',
    'transition-colors',
    'w-20',
    'h-10',
    'focus:outline-none',
    theme === 'dark' ? 'border-accent-dimmed' : 'border-accent'
  )
const toggleButton = (theme: Theme) =>
  classnames(
    'origin-center',
    'duration-700',
    'transition-transform',
    'transform-gpu',
    'focus:outline-none',
    theme === 'dark' ? toggleDark : toggleLight
  )
const toggleDark = classnames('rotate-180', 'translate-x-full')
const toggleLight = classnames('rotate-0', 'translate-x-0')
const transition = classnames('transition-colors')

const ThemeToggle = () => {
  const appStoreSnapshot = useSnapshot(AppStore)
  const theme = appStoreSnapshot.theme
  const colors = (theme: Theme) => ({
    path: `var(${
      theme === 'dark' ? '--accent' : '--logo-layer-gradient-from'
    })`,
    circle: `var(--semi-background)`,
  })

  return (
    <button
      className={toggleContainer(theme)}
      onClick={() => {
        AppStore.theme = AppStore.theme === 'dark' ? 'light' : 'dark'
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={toggleButton(theme)}
      >
        <g opacity="0.6">
          <path
            d="M17.4791 28.8759C16.5615 29.396 15.4382 29.396 14.5205 28.8759L10.0341 26.333L5.58869 23.7191C4.67945 23.1845 4.11777 22.2116 4.10939 21.1569L4.0684 16.0001L4.10939 10.8433C4.11777 9.78853 4.67945 8.81568 5.58869 8.28105L10.0341 5.66715L14.5205 3.12425C15.4382 2.60414 16.5615 2.60414 17.4791 3.12425L21.9655 5.66715L26.411 8.28105C27.3202 8.81568 27.8819 9.78853 27.8903 10.8433L27.9313 16.0001L27.8903 21.1569C27.8819 22.2116 27.3202 23.1845 26.411 23.7191L21.9655 26.333L17.4791 28.8759Z"
            fill={colors(theme).path}
            className={transition}
          ></path>
          <circle
            cx="15.9999"
            cy="16"
            r="4.57143"
            fill={colors(theme).circle}
            className={transition}
          ></circle>
        </g>
      </svg>
    </button>
  )
}

export default ThemeToggle
