import { ComponentChildren } from 'preact'
import ChildrenProp from 'models/ChildrenProp'
import Section from 'components/Section'

export default function ({
  title,
  children,
}: ChildrenProp & { title?: ComponentChildren }) {
  return <Section title={title}>{children}</Section>
}
