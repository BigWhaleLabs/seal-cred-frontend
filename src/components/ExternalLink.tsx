import ChildrenProp from 'models/ChildrenProp'

export default function ({ url, children }: ChildrenProp & { url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
