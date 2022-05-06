import { useEffect, useState } from 'react'

const mdSize = 600
const lgSize = 1023

function getWidth() {
  const { innerWidth: width } = window
  return width
}

export default function useBreakpoints() {
  const [width, setWidth] = useState(getWidth())
  const [size] = useState({ md: width > mdSize, lg: width > lgSize })

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))

    size.md = width > mdSize
    size.lg = width > lgSize
  }, [size, width])

  return size
}
