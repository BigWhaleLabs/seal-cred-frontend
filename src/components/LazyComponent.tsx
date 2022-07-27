import { JSX } from 'preact'
import { Suspense } from 'react'
import { minHeight } from 'classnames/tailwind'
import Loading from 'icons/Loading'

export default function ({ lazyImported }: { lazyImported: JSX.Element }) {
  return (
    <Suspense
      fallback={
        <div className={minHeight('min-h-screen')}>
          <Loading screenCentre />
        </div>
      }
    >
      {lazyImported}
    </Suspense>
  )
}
