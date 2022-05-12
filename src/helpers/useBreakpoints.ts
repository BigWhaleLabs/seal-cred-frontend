import { useEffect, useState } from 'react'

const xsSize = 279
const smSize = 375
const mdSize = 600
const lgSize = 1023

export default function useBreakpoints() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    function resizer() {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', resizer)
    return () => {
      window.removeEventListener('resize', resizer)
    }
  }, [])

  return {
    xs: width > xsSize,
    sm: width > smSize,
    md: width > mdSize,
    lg: width > lgSize,
    mobile: width > xsSize && width < smSize,
  }
}
