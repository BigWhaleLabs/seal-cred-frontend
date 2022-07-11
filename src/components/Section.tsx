import { ComponentChildren } from 'preact'
import { SectionTitle } from 'components/Text'
import { space } from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

export default function ({
  title,
  children,
  show = true,
}: ChildrenProp & { title?: ComponentChildren; show?: boolean }) {
  if (!show) return null

  return (
    <section className={space('space-y-2')}>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </section>
  )
}
