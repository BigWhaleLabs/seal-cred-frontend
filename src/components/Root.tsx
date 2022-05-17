import { ReactNode } from 'react'
import { classnames, margin, padding } from 'classnames/tailwind'

const root = classnames(margin('mx-auto'), padding('pb-10'))

export default function ({ children }: { children: ReactNode }) {
  return <div className={root}>{children}</div>
}
