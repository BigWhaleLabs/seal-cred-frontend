import { Suspense } from 'react'
import Card from 'components/Card'
import EmailFlowCard from 'components/email-flow/EmailFlowCard'
import LoadingCard from 'components/proofs/LoadingCard'
import SealCredCTM from 'components/email-flow/SealCredCTM'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  padding,
  space,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  space('space-y-6'),
  padding('pb-2')
)

export default function () {
  return (
    <div className={container}>
      <Suspense
        fallback={
          <Card color="secondary" shadow onlyWrap>
            <LoadingCard />
          </Card>
        }
      >
        <EmailFlowCard />
      </Suspense>
      <SealCredCTM />
    </div>
  )
}
