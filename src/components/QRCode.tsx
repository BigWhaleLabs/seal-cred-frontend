import { Suspense, useEffect, useRef } from 'react'
import { useSnapshot } from 'valtio'
import QRCodeStyling from 'qr-code-styling'
import QrLoader from 'components/QrLoader'
import StreetCredStore from 'stores/StreetCredStore'
import classnames, { borderRadius, overflow } from 'classnames/tailwind'

interface QRCodeProps {
  derivativeAddress: string
}

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

function QRCodeSuspender({ derivativeAddress }: QRCodeProps) {
  const { derivativeTokenIds } = useSnapshot(StreetCredStore)
  const tokenId = derivativeTokenIds[derivativeAddress]

  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) qrCode.append(ref.current)
    qrCode.update({
      data: `https://streetcred.one/public/${derivativeAddress}/${tokenId}`,
    })
  }, [derivativeAddress, tokenId])

  return <div ref={ref} className={qrCodeContainer} />
}

export default function QRCode({ derivativeAddress }: QRCodeProps) {
  return (
    <Suspense fallback={<QrLoader />}>
      <QRCodeSuspender derivativeAddress={derivativeAddress} />
    </Suspense>
  )
}
