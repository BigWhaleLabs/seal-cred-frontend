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
  const {
    emailDerivativeContracts = [],
    ERC721derivativeContracts = [],
    externalERC721derivativeContracts = [],
  } = useSnapshot(SealCredStore)

  const contractsOwned = useContractsOwned(GoerliContractsStore)

  const ownedEmailDerivativeContracts = emailDerivativeContracts.filter(
    (contractAddress) => contractsOwned.includes(contractAddress)
  )

  const ownedExternalERC721DerivativeContracts =
    externalERC721derivativeContracts.filter((contractAddress) =>
      contractsOwned.includes(contractAddress)
    )
  const ownedERC721DerivativeContracts = ERC721derivativeContracts.filter(
    (contractAddress) => contractsOwned.includes(contractAddress)
  )

  const totalMinted =
    ownedExternalERC721DerivativeContracts.length +
    ownedEmailDerivativeContracts.length +
    ownedERC721DerivativeContracts.length

  const userMintedOne = totalMinted > 0 && totalMinted < 2

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

  return shouldDisplay ? (
    <canvas
      ref={canvasRef}
      className={confettiCanvas}
      disabled={shouldDisplay}
    />
  ) : null
}
