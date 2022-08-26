import { display } from 'classnames/tailwind'

export const displayFromXs = display('hidden', 'xs:flex')
export const displayFromSm = display('hidden', 'sm:flex')
export const displayFromMd = display('hidden', 'md:flex')
export const displayFromLg = display('hidden', 'lg:flex')

export const displayFromXsToSm = display('flex', 'sm:hidden')

export const displayToMd = display('flex', 'md:hidden')
export const displayToLg = display('flex', 'lg:hidden')
