import { useSnapshot } from 'valtio'

declare module 'valtio' {
  function useSnapshot<T extends object>(p: T): T
}

export default function useWritableSnapshot<T extends object>(proxyObject: T) {
  return useSnapshot(proxyObject)
}
