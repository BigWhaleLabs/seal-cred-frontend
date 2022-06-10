import { ComponentChildren } from 'preact'
import { ProofSectionTitle } from 'components/Text'
import ChildrenProp from 'models/ChildrenProp'

export default function ({
  title,
  children,
}: ChildrenProp & { title?: ComponentChildren }) {
  return (
    <section>
      <ProofSectionTitle>{title}</ProofSectionTitle>
      {children}
    </section>
  )
}
