import { Suspense } from 'preact/compat'
import ChildrenProp from 'models/ChildrenProp'
import Loading from 'icons/Loading'

export default function ({ children }: ChildrenProp) {
  return <Suspense fallback={<Loading screenCentre />}>{children}</Suspense>
}
