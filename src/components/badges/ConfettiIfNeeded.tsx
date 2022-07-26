import { GoerliContractsStore } from 'stores/ContractsStore'
import { useEffect, useRef } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import NotificationsStore from 'stores/NotificationsStore'
import SealCredStore from 'stores/SealCredStore'
import classnames, {
  height,
  inset,
  pointerEvents,
  position,
  width,
  zIndex,
} from 'classnames/tailwind'
import confetti from 'canvas-confetti'
import useContractsOwned from 'hooks/useContractsOwned'

const confettiCanvas = classnames(
  position('absolute'),
  inset('lg:-left-32', 'left-0'),
  width('lg:w-full-125', 'w-full'),
  height('h-full'),
  zIndex('z-50'),
  pointerEvents('pointer-events-none')
)

export default function () {
  const { shareToTwitterClosed } = useSnapshot(NotificationsStore)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { derivativeContracts = [] } = useSnapshot(SealCredStore)

  const supportedContracts = useContractsOwned(GoerliContractsStore)

  const totalOwnedDerivatives = derivativeContracts.filter((contractAddress) =>
    supportedContracts.includes(contractAddress)
  ).length

  const userMintedOne = totalOwnedDerivatives > 0 && totalOwnedDerivatives < 2

  const shouldDisplay = userMintedOne && !shareToTwitterClosed

  useEffect(() => {
    if (!canvasRef.current || !shouldDisplay) return

    const mintConfetti = confetti.create(canvasRef.current, { resize: true })
    void mintConfetti({
      spread: 80,
      decay: 0.8,
      particleCount: 150,
      colors: ['#fed823', '#ff7bed', '#15a1fc', '#01feb6'],
    })
  }, [canvasRef, shouldDisplay])

  if (!shouldDisplay) return null

  return (
    <canvas
      ref={canvasRef}
      className={confettiCanvas}
      disabled={shouldDisplay}
    />
  )
}
