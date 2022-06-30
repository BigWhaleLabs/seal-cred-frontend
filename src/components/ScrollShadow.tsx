import ChildrenProp from 'models/ChildrenProp'

export default function ({ children }: ChildrenProp) {
  return <div className="scroll-shadow">{children}</div>
}
