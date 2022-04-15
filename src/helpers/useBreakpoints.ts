import { useEffect, useState } from 'react'

const mdSize = 768

export default function useBreakpoints() {
  const [width, setWidth] = useState(window.innerWidth)
  const [size] = useState({ md: width > mdSize })
  window.addEventListener('resize', () => setWidth(window.innerWidth))

  useEffect(() => {
    size.md = width > mdSize
  }, [size, width])

  return size
}
