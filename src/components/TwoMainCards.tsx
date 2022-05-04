import {
  alignItems,
  classnames,
  display,
  flexDirection,
  justifyContent,
  space,
} from 'classnames/tailwind'
import BadgingCard from 'components/BadgingCard'
import ProofsCard from 'components/ProofsCard'

const proofingCardContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-start'),
  space('space-x-5'),
  justifyContent('justify-center')
)

export default function TwoMainCards() {
  return (
    <div className={proofingCardContainer}>
      <ProofsCard />
      <BadgingCard />
    </div>
  )
}
