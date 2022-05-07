import { useEffect, useState } from 'react'

const mdSize = 600
const lgSize = 1023

function getWidth() {
  const { innerWidth: width } = window
  return width
}

export default function useBreakpoints() {
  const [width, setWidth] = useState(getWidth())

  useEffect(() => {
    function resizer() {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', resizer)
    return () => {
      window.removeEventListener('resize', resizer)
    }
  }, [])

  return { md: width > mdSize, lg: width > lgSize }
}
