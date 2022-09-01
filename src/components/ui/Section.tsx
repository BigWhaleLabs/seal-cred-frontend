import { ComponentChildren } from 'preact'
import { SectionTitle } from 'components/ui/Text'
import { space } from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

export default function ({
  title,
  children,
}: ChildrenProp & { title?: ComponentChildren }) {
  return (
    <section className={space('space-y-2')}>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </section>
  )
}
