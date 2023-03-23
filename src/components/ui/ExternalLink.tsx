import ChildrenProp from 'models/ChildrenProp'

export default function ({ children, url }: ChildrenProp & { url: string }) {
  return (
    <a href={url} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  )
}
