import { useEffect, useState } from 'react'

export default function useScrollPercent() {
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScroll(
        window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
      )
    }

    window.addEventListener('scroll', () => handleScroll)

    return () => window.addEventListener('scroll', handleScroll)
  }, [])

  return scroll
}
