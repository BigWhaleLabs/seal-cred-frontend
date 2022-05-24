import { useEffect, useState } from 'react'

const xsSize = 279
const smSize = 375
const mdSize = 600
const lgSize = 1023

export default function () {
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
    iPhoneSizes: width > smSize && width < 400,
    xxs: width > xsSize,
    xs: width > xsSize && width < smSize,
    sm: width > smSize,
    md: width > mdSize,
    lg: width > lgSize,
  }
}
