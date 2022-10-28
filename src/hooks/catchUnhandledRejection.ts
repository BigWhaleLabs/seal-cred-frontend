import { useEffect } from 'preact/hooks'

export default function catchUnhandledRejection(
  callback?: (e: unknown) => void
) {
  useEffect(() => {
    const listener = ({ reason }: PromiseRejectionEvent) => {
      console.error('Catch unhandledrejection:', reason.message)
      if (callback) callback(reason)
    }

    window.addEventListener('unhandledrejection', listener)
    return () => window.removeEventListener('unhandledrejection', listener)
  }, [callback])
}
