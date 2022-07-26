import { useEffect, useRef } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import NotificationsStore from 'stores/NotificationsStore'
import classnames, {
  height,
  inset,
  pointerEvents,
  position,
  width,
  zIndex,
} from 'classnames/tailwind'
import confetti from 'canvas-confetti'

const confettiCanvas = classnames(
  position('absolute'),
  inset('lg:-left-32', 'left-0', 'top-0'),
  width('lg:w-full-125', 'w-full'),
  height('h-full'),
  zIndex('z-50'),
  pointerEvents('pointer-events-none')
)

export default function () {
  const { shareToTwitterClosed } = useSnapshot(NotificationsStore)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  if (shareToTwitterClosed) return null

  useEffect(() => {
    if (!canvasRef.current) return

    const mintConfetti = confetti.create(canvasRef.current, { resize: true })
    void mintConfetti({
      spread: 80,
      decay: 0.8,
      particleCount: 150,
      colors: ['#fed823', '#ff7bed', '#15a1fc', '#01feb6'],
    })
  }, [canvasRef, shareToTwitterClosed])

  return <canvas ref={canvasRef} className={confettiCanvas} />
}
