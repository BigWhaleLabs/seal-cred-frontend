import { MutableRefObject, useState } from 'react'
import useOnScreen from 'helpers/useOnScreen'

export default function useSphereAnimation(
  sphereRef: MutableRefObject<HTMLDivElement>
) {
  const [spherePosy, setSpherePosy] = useState({ x: 0, y: 0 })
  const { current } = sphereRef
  if (!current) return spherePosy
  const isVisible = useOnScreen(sphereRef)

  // 0. ScrollPosy === TranslateY() of orb if visible and animation didn't end
  // 1. User sees the orbs (intersectionObserver) — animation is activating, starting to change to Y posy

  if (isVisible)
    setSpherePosy({
      ...spherePosy,
      y: window.scrollY,
    })

  // 2. User scrolls to ZK block — we're changing the orbs to contain "ZK" text

  // 3. User scroll to faces block — moving orbs across the lines behind the card
  // 4. Reveal the orbs in the card

  return spherePosy
}
