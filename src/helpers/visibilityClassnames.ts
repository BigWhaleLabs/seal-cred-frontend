import { display } from 'classnames/tailwind'

type Size = 'xs' | 'sm' | 'md' | 'lg'

/**
 * If we put from/to into the classnames, it will break production build.
 * Tailwind will cut unused classnames (classnames not-generated before function execution)
 */

export const displayFrom = (from: Size) => {
  switch (from) {
    case 'xs':
      return display('hidden', 'xs:flex')
    case 'sm':
      return display('hidden', 'sm:flex')
    case 'md':
      return display('hidden', 'md:flex')
    case 'lg':
      return display('hidden', 'lg:flex')
  }
}

export const displayTo = (to: Size) => {
  switch (to) {
    case 'xs':
      return display('flex', 'xs:hidden')
    case 'sm':
      return display('flex', 'sm:hidden')
    case 'md':
      return display('flex', 'md:hidden')
    case 'lg':
      return display('flex', 'lg:hidden')
  }
}
