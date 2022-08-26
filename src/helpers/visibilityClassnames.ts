import { display } from 'classnames/tailwind'

type Size = 'xs' | 'sm' | 'md' | 'lg'

export const displayFrom = (from: Size) => display('hidden', `${from}:flex`)

export const displayTo = (to: Size) => display('flex', `${to}:hidden`)
