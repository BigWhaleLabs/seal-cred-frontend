import { useEffect, useRef } from 'react'
import QRCodeStyling from 'qr-code-styling'
import classnames, {
  borderRadius,
  minWidth,
  overflow,
} from 'classnames/tailwind'

interface QRCodeProps {
  derivativeAddress: string
  tokenId?: number
}

const qrCodeContainer = classnames(
  borderRadius('rounded-2xl'),
  overflow('overflow-hidden'),
  minWidth('min-w-fit')
)

const qrCode = new QRCodeStyling({
  width: 140,
  height: 140,
  type: 'svg',
  image: '/img/logo.svg',
  dotsOptions: {
    color: '#fed823',
    type: 'dots',
  },
  cornersSquareOptions: {
    color: '#ff7bed',
    type: 'dot',
  },
  cornersDotOptions: {
    type: 'dot',
  },
  backgroundOptions: {
    color: '#0d0030',
  },
})

export default function QRCode({ derivativeAddress, tokenId }: QRCodeProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const url = `https://sealcred.xyz/${derivativeAddress}/${tokenId}`

  useEffect(() => {
    if (!ref.current) return

    qrCode.append(ref.current)
    qrCode.update({
      data: url,
    })
  }, [url])

  return <a href={url} ref={ref} className={qrCodeContainer} />
}
