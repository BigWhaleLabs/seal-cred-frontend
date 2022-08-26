import { useEffect, useState } from 'react'

const xsSize = 279
const smSize = 375
const mdSize = 600

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
    xxs: width > xsSize,
    xs: width > xsSize && width <= smSize,
    sm: width > smSize,
    md: width > mdSize,
  }
}
