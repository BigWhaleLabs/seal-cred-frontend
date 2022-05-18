import classnames, {
  borderRadius,
  boxShadow,
  boxShadowColor,
  fill,
  stroke,
  strokeWidth,
} from 'classnames/tailwind'

const svgClasses = classnames(
  boxShadow('shadow-lg'),
  boxShadowColor('shadow-secondary'),
  borderRadius('rounded-full')
)
const walletClasses = (connected?: boolean, isFilled?: boolean) =>
  classnames(
    strokeWidth('stroke-2'),
    stroke(connected ? 'stroke-secondary' : 'stroke-primary-semi-dimmed'),
    fill(isFilled ? 'fill-primary-dark' : undefined)
  )

export default function ({ connected }: { connected?: boolean }) {
  return connected ? (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={svgClasses}
    >
      <circle
        cx="21"
        cy="21"
        r="20"
        className={walletClasses(connected, true)}
        stroke-linecap="round"
      />
      <path
        d="M36 34V21.4483C36 12.9164 29.2843 6 21 6C12.7157 6 6 12.9164 6 21.4483V34"
        className={walletClasses(connected)}
        stroke-linecap="round"
      />
      <path
        d="M24.2253 17.978C24.2253 16.0839 25.7194 14.5484 27.5624 14.5484C29.4054 14.5484 30.8994 16.0839 30.8994 17.978C30.8994 19.8721 29.4054 17.978 27.5624 17.978C25.7194 17.978 24.2253 19.8721 24.2253 17.978Z"
        className={walletClasses(connected)}
        stroke-linecap="round"
      />
      <path
        d="M20.9998 24.2256C22.2469 24.2256 23.2578 24.3751 23.2578 22.9446C23.2578 21.5142 22.2469 20.3546 20.9998 20.3546C19.7527 20.3546 18.7417 21.5142 18.7417 22.9446C18.7417 24.3751 19.7527 24.2256 20.9998 24.2256ZM20.9998 24.2256C20.9998 25.0858 20.9998 26.9998 20.9998 27.774M20.9998 27.774C20.9998 30.3547 24.2256 30.3546 24.2256 27.774M20.9998 27.774C20.9998 30.3546 17.774 30.3546 17.774 27.774"
        className={walletClasses(connected)}
        stroke-linecap="round"
      />
      <path
        d="M11.322 17.978C11.322 16.0839 12.8161 14.5484 14.6591 14.5484C16.502 14.5484 17.9961 16.0839 17.9961 17.978C17.9961 19.8721 16.502 17.978 14.6591 17.978C12.8161 17.978 11.322 19.8721 11.322 17.978Z"
        className={walletClasses(connected)}
        stroke-linecap="round"
      />
      <path
        d="M31.3221 24.2256L27.4512 24.8707"
        className={walletClasses(connected)}
        stroke-linecap="round"
      />
      <path
        d="M27.4513 27.8066L31.3223 28.4518"
        className={walletClasses(connected)}
        stroke-linecap="round"
      />
      <path
        d="M10.6779 24.2256L14.5488 24.8707"
        className={walletClasses(connected)}
        stroke-linecap="round"
      />
      <path
        d="M14.5487 27.8062L10.6777 28.4513"
        className={walletClasses(connected)}
        stroke-linecap="round"
      />
    </svg>
  ) : (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="21"
        cy="21"
        r="20"
        className={walletClasses(connected, true)}
        stroke-linecap="round"
      />
      <path
        d="M36 34V21.4483C36 12.9164 29.2843 6 21 6C12.7157 6 6 12.9164 6 21.4483V34"
        className={walletClasses(connected)}
        stroke-linecap="round"
      />
      <path
        d="M31.0992 17.2321C30.1522 18.8724 28.0906 19.4552 26.4945 18.5337C24.8984 17.6122 24.3723 15.5354 25.3193 13.8951C26.2664 12.2547 26.6132 14.6421 28.2093 15.5636C29.8054 16.4851 32.0463 15.5918 31.0992 17.2321Z"
        className={walletClasses(connected)}
        stroke-linecap="round"
      />
      <path
        d="M20.9998 24.2258C22.2469 24.2258 23.2578 24.3752 23.2578 22.9448C23.2578 21.5144 22.2469 20.3548 20.9998 20.3548C19.7527 20.3548 18.7417 21.5144 18.7417 22.9448C18.7417 24.3752 19.7527 24.2258 20.9998 24.2258ZM20.9998 24.2258C20.9998 25.086 20.9998 26.9999 20.9998 27.7741M20.9998 27.7741C20.9998 30.3548 24.2256 27.7741 24.2256 30.5M20.9998 27.7741C20.9998 30.3548 17.774 27.7742 17.774 30.5"
        className={walletClasses(connected)}
        stroke-linecap="round"
      />
      <path
        d="M16.1036 13.4097C17.443 14.749 17.4722 16.8912 16.1691 18.1944C14.8659 19.4976 12.7237 19.4683 11.3843 18.129C10.045 16.7896 12.4408 17.0725 13.7439 15.7693C15.0471 14.4661 14.7643 12.0703 16.1036 13.4097Z"
        className={walletClasses(connected)}
        stroke-linecap="round"
      />
      <path
        d="M31.3221 24.2256L27.4512 24.8707"
        className={walletClasses(connected)}
        stroke-linecap="round"
      />
      <path
        d="M27.4513 27.8066L31.3223 28.4518"
        className={walletClasses(connected)}
        stroke-linecap="round"
      />
      <path
        d="M10.6779 24.2256L14.5488 24.8707"
        className={walletClasses(connected)}
        stroke-linecap="round"
      />
      <path
        d="M14.5487 27.8062L10.6777 28.4513"
        className={walletClasses(connected)}
        stroke-linecap="round"
      />
    </svg>
  )
}
