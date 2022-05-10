import { MutableRefObject, useLayoutEffect, useState } from 'react'

const useIsOverflow = (ref: MutableRefObject<HTMLDivElement>) => {
  const [isOverflow, setIsOverflow] = useState(false)

  useLayoutEffect(() => {
    const { current } = ref
    if (!current) return

    const overflows =
      current.scrollHeight > current.clientHeight ||
      current.scrollWidth > current.clientWidth
    setIsOverflow(overflows)
  }, [ref])

  return isOverflow
}

export default useIsOverflow
