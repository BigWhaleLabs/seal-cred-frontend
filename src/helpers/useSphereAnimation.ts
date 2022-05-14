import { useEffect, useState } from 'react'
import Colors from 'models/Colors'

// Animation breakpoints Y
const animStart = 1300 // 0%
const changeToZk = 1700 // 30%
const superOrb = 2000 // 50%
const leftAndRight = 2238 // 65%
const animEnd = 2700 // 100%

export default function useSphereAnimation(color: Colors) {
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY + window.innerHeight // represents window center

      if (y > animStart && y < animEnd) {
        setScroll(
          window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
        )
      }
    }

    window.addEventListener('scroll', () => handleScroll)

    return () => window.addEventListener('scroll', handleScroll)
  }, [color])

  return scroll
}
