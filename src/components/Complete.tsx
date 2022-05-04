import classnames, { dropShadow } from 'classnames/tailwind'

const completeContainer = classnames(dropShadow('drop-shadow-yellow'))

const Complete = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={completeContainer}
    >
      <circle cx="9" cy="9" r="9" fill="#FED823" />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="m5,8.88095l2.75,2.61905l5.25,-5"
        stroke="#3A00D6"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="2"
      />
    </svg>
  )
}

export default Complete
