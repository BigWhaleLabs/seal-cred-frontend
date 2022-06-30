import { ComponentChildren } from 'preact'
import ChildrenProp from 'models/ChildrenProp'
import Section from 'components/Section'
import classnames, {
  display,
  gap,
  gridAutoRows,
  gridTemplateColumns,
} from 'classnames/tailwind'

const badgesList = classnames(
  display('grid'),
  gap('gap-2'),
  gridAutoRows('auto-rows-auto'),
  gridTemplateColumns('grid-cols-1', 'lg:grid-cols-2')
)

export default function ({
  title,
  children,
}: ChildrenProp & { title?: ComponentChildren }) {
  return (
    <Section title={title}>
      <div className={badgesList}>{children}</div>
    </Section>
  )
}
