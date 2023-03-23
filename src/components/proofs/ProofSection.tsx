import { ComponentChildren } from 'preact'
import ChildrenProp from 'models/ChildrenProp'
import Section from 'components/ui/Section'

export default function ({
  children,
  title,
}: ChildrenProp & { title?: ComponentChildren }) {
  return <Section title={title}>{children}</Section>
}
