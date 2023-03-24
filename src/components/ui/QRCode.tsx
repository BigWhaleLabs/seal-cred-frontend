import { useLayoutEffect, useRef } from 'react'
import QRCodeStyling, { Options } from 'qr-code-styling'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  inset,
  justifyContent,
  minWidth,
  overflow,
  position,
  width,
} from 'classnames/tailwind'

interface QRCodeProps {
  derivativeAddress: string
  tokenId?: number
}

const qrCodeContainer = classnames(
  position('relative'),
  borderRadius('rounded-2xl'),
  overflow('overflow-hidden'),
  minWidth('min-w-fit')
)
const qrCodeLogoContainer = classnames(
  position('absolute'),
  display('flex'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  inset('inset-0')
)
const qrCodeLogo = classnames(width('w-8'), backgroundColor('bg-primary-dark'))

const QRCodeOptions: Options = {
  backgroundOptions: {
    color: '#0d0030',
  },
  cornersDotOptions: {
    type: 'dot',
  },
  cornersSquareOptions: {
    color: '#ff7bed',
    type: 'dot',
  },
  dotsOptions: {
    color: '#fed823',
    type: 'dots',
  },
  height: 200,
  image: '',
  margin: 10,
  type: 'canvas',
  width: 200,
}

export default function ({ derivativeAddress, tokenId }: QRCodeProps) {
  const ref = useRef<HTMLDivElement>(null)
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
      className={classNamesToString(qrCodeContainer, 'custom-qr-code')}
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div ref={ref} />
      <div className={qrCodeLogoContainer}>
        <img className={qrCodeLogo} src="/img/logo.svg" />
      </div>
    </a>
  )
}
