import { useEffect, useRef } from 'react'
import QRCodeStyling from 'qr-code-styling'
import classnames, { borderRadius, overflow } from 'classnames/tailwind'

const qrCodeContainer = classnames(
  borderRadius('rounded-2xl'),
  overflow('overflow-hidden')
)

const qrCode = new QRCodeStyling({
  width: 200,
  height: 200,
  margin: 10,
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

export default function QRCode({
  derivativeAddress,
  tokenId,
}: {
  derivativeAddress: string
  tokenId: number
}) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) qrCode.append(ref.current)
    qrCode.update({
      data: `https://streetcred.one/${derivativeAddress}/${tokenId}`,
    })
  }, [derivativeAddress, tokenId])

  return <div ref={ref} className={qrCodeContainer} />
}
