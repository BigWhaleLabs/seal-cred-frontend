import { HeaderText } from 'components/Text'
import Badges from 'components/Badges'
import Card from 'components/Card'
import CardSeparator from 'components/CardSeparator'
import ZkProofButton from 'components/ZkProofButton'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
} from 'classnames/tailwind'

const mainBlock = classnames(
  display('flex'),
  flexDirection('flex-col', 'md:flex-row'),
  alignItems('items-center', 'md:items-start'),
  justifyContent('sm:justify-center')
)

function Main() {
  return (
    <>
      <div className={mainBlock}>
        <Card shadow color="yellow">
          <HeaderText size="4xl" bold>
            Supported NFTs:
          </HeaderText>
        </Card>
        <CardSeparator number={3} from="yellow" to="pink" />
        <Card shadow color="pink">
          <Badges />
        </Card>
      </div>
      <ZkProofButton />
    </>
  )
}

export default Main
