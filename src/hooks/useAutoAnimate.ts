import { RefObject } from 'preact/compat'
import { useEffect, useRef } from 'preact/hooks'
import autoAnimate, {
  AutoAnimateOptions,
  AutoAnimationPlugin,
} from '@formkit/auto-animate'

export default function <T extends Element>(
  options: Partial<AutoAnimateOptions> | AutoAnimationPlugin = {}
): [RefObject<T>] {
  const element = useRef<T>(null)

  useEffect(() => {
    if (element.current instanceof HTMLElement)
      autoAnimate(element.current, options)
  }, [element, options])

  return [element]
}
