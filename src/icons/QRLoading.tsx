import classnames, { borderRadius, overflow } from 'classnames/tailwind'

const qrCodeContainer = classnames(
  borderRadius('rounded-2xl'),
  overflow('overflow-hidden')
)

export default function QRLoading() {
  return (
    <svg width="140" height="140" className={qrCodeContainer}>
      <rect x="0" y="0" height="140" width="140" fill="#0d0030"></rect>
      <image
        x="53"
        y="53"
        width="33px"
        height="33px"
        href="/img/logo.svg"
      ></image>
    </svg>
  )
}
