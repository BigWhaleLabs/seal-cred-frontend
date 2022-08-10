import { JSX } from 'preact'
import { Suspense } from 'react'
import Loading from 'icons/Loading'

export default function ({ lazyImported }: { lazyImported: JSX.Element }) {
  return (
    <Suspense
      fallback={
        <div>
          <Loading screenCentre />
        </div>
      }
    >
      {lazyImported}
    </Suspense>
  )
}
