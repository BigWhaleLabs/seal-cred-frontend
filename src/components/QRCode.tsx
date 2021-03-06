import { useLayoutEffect, useRef } from 'react'
import QRCodeStyling, { Options } from 'qr-code-styling'
import classNamesToString from 'helpers/classNamesToString'
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

const QRCodeOptions: Options = {
  type: 'canvas',
  margin: 10,
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
}

export default function ({ derivativeAddress, tokenId }: QRCodeProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const url = `${window.location.origin}/${derivativeAddress}/${tokenId}`

  useLayoutEffect(() => {
    if (!ref.current) return
    const qrCode = new QRCodeStyling(QRCodeOptions)
    qrCode.append(ref.current)
    qrCode.update({
      data: url,
    })
  }, [url])

  return (
    <a
      href={url}
      ref={ref}
      className={classNamesToString(qrCodeContainer, 'custom-qr-code')}
      target="_blank"
      rel="noopener noreferrer"
    />
  )
}
