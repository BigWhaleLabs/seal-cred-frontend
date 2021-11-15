import { FC } from 'react'
import { SecondaryText } from 'components/Text'
import { classnames } from 'classnames/tailwind'

export interface SectionProps {
  title?: string
}

const section = (vertical: boolean) =>
  classnames(
    'flex',
    'justify-between',
    'items-center',
    'my-2',
    vertical ? 'flex-col' : 'flex-row',
    vertical ? 'space-y-2' : 'space-x-2'
  )

export const Section: FC<{ vertical?: boolean }> = ({ vertical, children }) => {
  return <div className={section(vertical || false)}>{children}</div>
}

const group = classnames('mt-auto', 'pt-6', 'space-y-2')
export const Group: FC<{ title?: string }> = ({ title, children }) => {
  return (
    <div className={group}>
      <SecondaryText>{title}:</SecondaryText>
      {children}
    </div>
  )
}
