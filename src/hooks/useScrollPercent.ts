import { useEffect, useState } from 'react'

export default function () {
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScroll(
        window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
      )
    }

    window.addEventListener('scroll', handleScroll, true)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scroll
}
