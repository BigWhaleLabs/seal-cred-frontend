import { ComponentChildren } from 'preact'
import { ProofSectionTitle } from 'components/Text'
import { space } from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

export default function ({
  title,
  children,
}: ChildrenProp & { title?: ComponentChildren }) {
  return (
    <section>
      <ProofSectionTitle>{title}</ProofSectionTitle>
      <div className={space('space-y-2')}>{children}</div>
    </section>
  )
}
