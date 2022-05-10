import {
  AccentText,
  BodyText,
  HeaderText,
  HighlightedText,
  LinkText,
} from 'components/Text'
import Button from 'components/Button'
import Card from 'components/Card'
import DoubleSmile from 'icons/DoubleSmile'
import DownArrows from 'components/DownArrows'
import GetStartedButton from 'components/GetStartedButton'
import Grim from 'icons/Grim'
import NoisyRectangle from 'components/NoisyRectangle'
import PrivacyDeath from 'components/PrivacyDeath'
import SuperHr from 'components/SuperHr'
import ZkSphere from 'components/ZkSphere'
import classnames, {
  alignItems,
  display,
  flexDirection,
  margin,
  space,
} from 'classnames/tailwind'

const pageBox = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)
const scrollButton = classnames(
  margin('mt-20'),
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)
const identitiesCards = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  space('space-x-6'),
  margin('mb-6')
)
const innerId = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)
const zkSpheresLeft = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2'),
  margin('mt-2')
)
const zkSpheresRight = classnames(margin('mt-2'))

function Landing() {
  return (
    <div className={pageBox}>
      <Card
        shadow
        color="yellow"
        onlyWrap
        spinner="One Identity to rule them all"
      >
        <HeaderText size="4xl" leading={11}>
          Build your pseudonymous identity with ZK badges
        </HeaderText>
        <BodyText size="base">
          <AccentText color="text-yellow">SealCred</AccentText> allows you to
          experience the world pseudonymously with ZK badges. This means you can
          prove ownership of an NFT without it tracing back to you.
        </BodyText>
        <GetStartedButton />
      </Card>

      <button
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo(0, 600)
        }}
        className={scrollButton}
      >
        <AccentText color="text-yellow">How does this work?</AccentText>
        <DownArrows />
      </button>

      <HighlightedText>
        It starts with connecting your wallets with NFTs
      </HighlightedText>

      <Card color="white" onlyWrap shadow>
        <HeaderText size="4xl">Creating ZK Proof</HeaderText>
        <BodyText size="base">
          In your wallet(s), you have NFTs that can point back to your identity
          (aka, getting doxxed). But what if you can verify ownership of NFTs
          while staying pseudonymous? When you connect your wallet(s), we verify
          your NFTs. Then, we create ZK badges out of them.
        </BodyText>
      </Card>

      <div className={identitiesCards}>
        <Card color="white" shadow thin>
          <div className={innerId}>
            <NoisyRectangle bgColor="bg-green" />
            <NoisyRectangle bgColor="bg-yellow" />
            <BodyText size="base" center>
              Identity-01
            </BodyText>
            <DoubleSmile />
            <div className={zkSpheresLeft}>
              <ZkSphere bgColor="bg-green" shadowColor="shadow-green" />
              <ZkSphere bgColor="bg-yellow" shadowColor="shadow-yellow" />
            </div>
          </div>
        </Card>
        <Card color="white" shadow thin>
          <div className={innerId}>
            <NoisyRectangle bgColor="bg-pink" />
            <BodyText size="base" center>
              Identity-02
            </BodyText>
            <Grim />
            <div className={zkSpheresRight}>
              <ZkSphere bgColor="bg-pink" shadowColor="shadow-pink" />
            </div>
          </div>
        </Card>
      </div>

      <Card color="white" onlyWrap shadow>
        <HeaderText size="4xl">
          Building your identities with ZK Badges
        </HeaderText>
        <BodyText size="base">
          Once you have ZK proof, you can add create ZK badges for an anonymous
          wallet. Zk badges verify you own an NFT but leaves no bread crumbs
          back to your personal wallets.
        </BodyText>
        <GetStartedButton />
      </Card>

      <SuperHr />

      <Card color="blue" shadow onlyWrap>
        <PrivacyDeath />
        <BodyText size="base">
          <LinkText color="text-blue-500" url={`https://bigwhalelabs.com`}>
            Big Whale Labs{' '}
          </LinkText>
          is dedicated to building a pseudonymous world in which privacy and
          identity are owned by the human, not the corporation.
        </BodyText>
        <Button colors="tertiary" arrow>
          Learn more about us
        </Button>
      </Card>
    </div>
  )
}

export default Landing
