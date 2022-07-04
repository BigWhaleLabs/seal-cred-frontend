import { ComponentChildren } from 'preact'
import { space } from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'
import Section from 'components/Section'

export default function ({
  title,
  children,
}: ChildrenProp & { title?: ComponentChildren }) {
  return (
    <Section title={title}>
      <div className={space('space-y-2')}>{children}</div>
    </Section>
  )
}
