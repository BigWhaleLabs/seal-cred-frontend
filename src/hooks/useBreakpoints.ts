import { useEffect, useState } from 'react'

const xxsSize = 279
const xsSize = 360
const smSize = 450
const mdSize = 600
const tabletSize = 885
const lgSize = 1023
const xlSize = 1279

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
    lg: width > lgSize,
    md: width > mdSize,
    sm: width > smSize,
    tablet: width > tabletSize,
    xl: width > xlSize,
    xs: width > xsSize,
    xxs: width > xxsSize,
  }
}
