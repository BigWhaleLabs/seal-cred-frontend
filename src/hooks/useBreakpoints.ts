import { useEffect, useState } from 'react'

const xxsSize = 279
const xsSize = 360
const smSize = 450
const mdSize = 600
const lgSize = 1024

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
    xxs: width > xxsSize,
    xs: width > xxsSize && width <= xsSize,
    sm: width > smSize,
    md: width > mdSize,
    lg: width > lgSize,
  }
}
