import { useEffect, useRef } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import classnames, { height, inset, position, width } from 'classnames/tailwind'
import confetti from 'canvas-confetti'
import walletStore from 'stores/WalletStore'

const confettiCanvas = classnames(
  position('absolute'),
  inset('top-0', 'left-0'),
  width('w-full'),
  height('h-full')
)

export default function () {
  const { firstBadge } = useSnapshot(walletStore)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const mintConfetti = confetti.create(canvasRef.current, { resize: true })

    void mintConfetti({
      spread: 80,
      decay: 0.8,
      colors: ['#fed823', '#ff7bed', '#15a1fc', '#01feb6'],
    })
  }, [canvasRef, firstBadge])

  const shouldDisplay = firstBadge.minted && !firstBadge.notified

  return shouldDisplay ? (
    <canvas
      ref={canvasRef}
      className={confettiCanvas}
      disabled={shouldDisplay}
    />
  ) : null
}
