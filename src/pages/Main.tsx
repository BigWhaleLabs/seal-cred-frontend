import Badges from 'components/Badges'
import CardSeparator from 'components/CardSeparator'
import ProofsCard from 'components/ProofsCard'
import ZkProofButton from 'components/ZkProofButton'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  margin,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const mainBlock = classnames(
  display('flex'),
  flexDirection('flex-col', 'lg:flex-row'),
  alignItems('items-center', 'lg:items-stretch'),
  justifyContent('lg:justify-center')
)
const marginSeparator = (vertical?: boolean) =>
  classnames(margin(vertical ? 'mx-auto' : 'mt-12'))

export default function () {
  const { lg } = useBreakpoints()

  return (
    <>
      <div className={mainBlock}>
        <ProofsCard />
        <div className={marginSeparator(!lg)}>
          <CardSeparator
            number={3}
            from="accent"
            to="secondary"
            vertical={!lg}
          />
        </div>

        <Badges />
        {!lg && (
          <>
            <CardSeparator number={1} from="secondary" vertical />
            <ZkProofButton />
          </>
        )}
      </div>
    </>
  )
}
