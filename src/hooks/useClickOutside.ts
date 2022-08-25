import { RefObject } from 'preact'
import { useEffect } from 'preact/compat'

export default function (ref: RefObject<HTMLDivElement>, callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        event.target &&
        event.target instanceof Node &&
        ref.current?.contains(event.target)
      ) {
        return
      }
      callback()
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref, callback])
}
