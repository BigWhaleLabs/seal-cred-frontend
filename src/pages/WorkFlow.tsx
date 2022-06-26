import { Suspense } from 'react'
import Card from 'components/Card'
import LoadingTitle from 'components/proofs/LoadingTitle'
import SealCredCTM from 'components/work-flow/SealCredCTM'
import WorkFlowCard from 'components/work-flow/WorkFlowCard'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  space('space-y-6')
)
export default function () {
  return (
    <div className={container}>
      <Suspense
        fallback={
          <Card color="secondary" shadow onlyWrap>
            <LoadingTitle />
          </Card>
        }
      >
        <WorkFlowCard />
      </Suspense>
      <SealCredCTM />
    </div>
  )
}
