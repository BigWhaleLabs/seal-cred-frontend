import { classnames } from 'classnames/tailwind'
import { observer } from 'mobx-react-lite'

const logoContainer = classnames('relative')
const colors = {
  layer: 'var(--accent)',
  icon: 'var(--primary)',
  gradientFrom: 'var(--logo-layer-gradient-from)',
  gradientTo: 'var(--logo-layer-gradient-to)',
}
const shape = classnames('absolute', 'left-2', 'top-2.5')
const Logo = observer(() => {
  return (
    <div className={logoContainer}>
      <svg
        width="36"
        height="40"
        viewBox="0 0 36 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.3991 5.45026L26.4009 5.45128L32.0536 8.69945C33.7643 9.68245 34.8174 11.5065 34.8134 13.4795L34.8 19.999L34.8 20.001L34.8134 26.5205C34.8174 28.4935 33.7643 30.3175 32.0536 31.3006L26.4009 34.5487L26.3991 34.5497L20.7598 37.8211C19.0531 38.8111 16.9469 38.8111 15.2402 37.8211L9.60089 34.5497L9.59911 34.5487L3.94639 31.3006C2.23568 30.3175 1.18258 28.4935 1.18663 26.5205L1.2 20.001L1.2 19.999L1.18663 13.4795C1.18258 11.5065 2.23568 9.68245 3.94639 8.69945L9.59911 5.45129L9.60089 5.45026L15.2402 2.17894C16.9469 1.18893 19.0531 1.18893 20.7598 2.17894L26.3991 5.45026Z"
          fill={colors.layer}
          stroke="url(#paint0_linear_243:1333)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_243:1333"
            x1="18"
            y1="0"
            x2="18"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={colors.gradientFrom} stopOpacity="0.27" />
            <stop offset="1" stopColor={colors.gradientTo} stopOpacity="0.42" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        className={shape}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.77 11.5087L18.7462 13.3362C18.955 13.465 19.0825 13.6913 19.0825 13.9363C19.0825 14.1812 18.955 14.4075 18.7462 14.5362C16.93 15.6512 13.0437 18.0388 11.1225 19.22C10.4337 19.6425 9.56623 19.6425 8.87748 19.22C6.95623 18.0388 3.06998 15.6512 1.25373 14.5362C1.04498 14.4075 0.91748 14.1812 0.91748 13.9363C0.91748 13.6913 1.04498 13.465 1.25373 13.3362L4.22998 11.5087L8.55123 14.1638C9.43998 14.7088 10.56 14.7088 11.4487 14.1638L15.77 11.5087ZM11.1225 1.1525C10.4337 0.73 9.56623 0.73 8.87748 1.1525C6.95623 2.3325 3.06998 4.72125 1.25373 5.83625C1.04498 5.965 0.91748 6.19125 0.91748 6.43625C0.91748 6.68125 1.04498 6.9075 1.25373 7.03625C3.06998 8.15125 6.95623 10.5388 8.87748 11.72C9.56623 12.1425 10.4337 12.1425 11.1225 11.72C13.0437 10.5388 16.93 8.15125 18.7462 7.03625C18.955 6.9075 19.0825 6.68125 19.0825 6.43625C19.0825 6.19125 18.955 5.965 18.7462 5.83625C16.93 4.72125 13.0437 2.3325 11.1225 1.1525Z"
          fill="url(#paint0_linear_313:5)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_313:5"
            x1="15.4217"
            y1="1.94578"
            x2="3.01055"
            y2="15.0673"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor={colors.icon} stopOpacity="0.75" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
})

export default Logo
