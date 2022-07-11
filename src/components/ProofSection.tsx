import { ComponentChildren } from 'preact'
import ChildrenProp from 'models/ChildrenProp'
import Section from 'components/Section'

export default function ({
  title,
  children,
  hasContent = true,
}: ChildrenProp & { title?: ComponentChildren; hasContent?: boolean }) {
  return hasContent ? <Section title={title}>{children}</Section> : null
}
