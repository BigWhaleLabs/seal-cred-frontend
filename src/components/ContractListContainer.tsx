import { ReactNode } from 'react'
import classnames, { display, flexDirection, space } from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-2')
)

export default function ({ children }: { children: ReactNode }) {
  return <div className={container}>{children}</div>
}
