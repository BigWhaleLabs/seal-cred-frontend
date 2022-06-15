import { MutableRef } from 'preact/hooks'
import { useEffect } from 'react'

export default function (
  ref: MutableRef<HTMLDivElement>,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target as Node)) callback()
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref, callback])
}
