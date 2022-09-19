import { JSX } from 'preact'
import { Suspense } from 'react'
import Centered from 'components/ui/Centered'
import SealLoading from 'icons/SealLoading'

export default function ({ lazyImported }: { lazyImported: JSX.Element }) {
  return (
    <Suspense
      fallback={
        <Centered>
          <SealLoading color="accent" />
        </Centered>
      }
    >
      {lazyImported}
    </Suspense>
  )
}
