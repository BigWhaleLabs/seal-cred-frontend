import { useEffect, useRef } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import classnames, {
  height,
  inset,
  pointerEvents,
  position,
  width,
  zIndex,
} from 'classnames/tailwind'
import confetti from 'canvas-confetti'
import walletStore from 'stores/WalletStore'

const confettiCanvas = classnames(
  position('absolute'),
  inset('top-0', 'left-0'),
  width('w-full'),
  height('h-full'),
  zIndex('z-50'),
  pointerEvents('pointer-events-none')
)

export default function () {
  const { firstBadge } = useSnapshot(walletStore)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const mintConfetti = confetti.create(canvasRef.current, { resize: true })

    void mintConfetti({
      spread: 120,
      decay: 0.8,
      particleCount: 150,
      colors: ['#fed823', '#ff7bed', '#15a1fc', '#01feb6'],
    })
  }, [canvasRef, firstBadge])

  const shouldDisplay =
    firstBadge.minted && !firstBadge.notified && !firstBadge.twitted

  return shouldDisplay ? (
    <canvas
      ref={canvasRef}
      className={confettiCanvas}
      disabled={shouldDisplay}
    />
  ) : null
}
