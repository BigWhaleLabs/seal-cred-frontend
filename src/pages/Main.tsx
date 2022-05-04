import { CardHeader, HeaderText, SubHeaderDescription } from 'components/Text'
import { useSnapshot } from 'valtio'
import BadgeBlock from 'components/BadgeBlock'
import Card from 'components/Card'
import CardSeparator from 'components/CardSeparator'
import DerivativeContractsOwned from 'components/DerivativeContractsOwned'
import ListOfAvailableZKProofs from 'components/ListOfAvailableZKProofs'
import ListOfReadyZKProofs from 'components/ListOfReadyZKProofs'
import OriginalContractsOwned from 'components/OriginalContractsOwned'
import SupportedContracts from 'components/SupportedContracts'
import UnmintedDerivatives from 'components/UnmintedDerivatives'
import WalletStore from 'stores/WalletStore'
import ZkProofButton from 'components/ZkProofButton'
import classnames, {
  alignItems,
  backgroundImage,
  display,
  flexDirection,
  gap,
  gradientColorStops,
  gridAutoRows,
  gridTemplateColumns,
  height,
  inset,
  justifyContent,
  margin,
  overflow,
  position,
  space,
  width,
} from 'classnames/tailwind'

function Proofs() {
  return (
    <>
      <HeaderText>Supported NFTs that you own:</HeaderText>
      <OriginalContractsOwned />
      <HeaderText>ZK proofs that you can generate:</HeaderText>
      <ListOfAvailableZKProofs />
      <HeaderText>ZK proofs that you generated:</HeaderText>
      <ListOfReadyZKProofs />
      <HeaderText>Derivative NFTs that you can mint:</HeaderText>
      <UnmintedDerivatives />
      <HeaderText>Derivative NFTs that you own:</HeaderText>
      <DerivativeContractsOwned />
    </>
  )
}

const mainBlock = classnames(
  display('flex'),
  flexDirection('flex-col', 'md:flex-row'),
  alignItems('items-center', 'md:items-start'),
  justifyContent('sm:justify-center')
)

const mintList = classnames(
  position('relative'),
  display('grid'),
  gap('gap-2'),
  gridAutoRows('auto-rows-auto', 'md:auto-rows-auto'),
  gridTemplateColumns('grid-cols-1', 'md:grid-cols-2'),
  overflow('overflow-auto'),
  height('h-80')
)

const mintListOverflow = classnames(
  position('sticky'),
  inset('bottom-0', 'right-0', 'left-0'),
  width('w-full'),
  height('h-8'),
  backgroundImage('bg-gradient-to-b'),
  gradientColorStops('from-transparent', 'to-blue-900')
)

function Main() {
  const { account } = useSnapshot(WalletStore)

  return (
    <>
      <div className={mainBlock}>
        <Card shadow color="yellow">
          <HeaderText>Supported NFTs:</HeaderText>
          <SupportedContracts />
          {account && <Proofs />}
        </Card>
        <CardSeparator number={3} from="yellow" to="pink" />
        <Card shadow color="pink">
          <div className={space('space-y-6')}>
            <div className={space('space-y-2')}>
              <CardHeader>Create ZK badges</CardHeader>
              <SubHeaderDescription>
                Looks like you can create ZK badges for this wallet
              </SubHeaderDescription>
            </div>
            <div className={mintList}>
              <BadgeBlock minted name="CryptoPunk" />
              <BadgeBlock minted name="Dosu Invites" />
              <BadgeBlock name="tiny dino" />
              <BadgeBlock name="Doodles" />
              <BadgeBlock name="Bored Ape Yacht Club" />
              <div className={mintListOverflow}></div>
            </div>
          </div>
        </Card>
      </div>
      <ZkProofButton />
    </>
  )
}

export default Main
