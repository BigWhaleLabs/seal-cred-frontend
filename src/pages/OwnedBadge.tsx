import { AccentText, BodyText, HeaderText, LinkText } from 'components/Text'
import Button from 'components/Button'
import Card from 'components/Card'
import Smile from 'icons/Smile'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  margin,
  textOverflow,
} from 'classnames/tailwind'

const mainBox = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center')
)
const walletBox = classnames(display('flex'), flexDirection('flex-row'))
const walletAddress = classnames(
  display('flex'),
  flexDirection('flex-col'),
  margin('ml-4'),
  textOverflow('truncate')
)
const getStartedCard = classnames(margin('mt-6'))

export default function OwnedBadge() {
  return (
    <div className={mainBox}>
      <Card color="pink" shadow onlyWrap>
        <HeaderText size="4xl" leading={11}>
          This wallet owns a{' '}
          <AccentText color="text-pink" bold>
            Cryptopunk
          </AccentText>
        </HeaderText>
        <BodyText size="base">
          This is a zkNFT derivative. It means this person has been verified to
          own at least one{' '}
          <AccentText color="text-pink">‘Cryptopunk’</AccentText> NFT.
        </BodyText>

        <hr />

        <div className={walletBox}>
          <Smile />
          <div className={walletAddress}>
            <BodyText size="sm">Wallet address</BodyText>
            <LinkText
              url=""
              gradientFrom="from-pink"
              gradientTo="to-yellow"
              bold
            >
              0x9F44Bd870c03Bda38bc18f277D04A1C9E9318FeA
            </LinkText>
          </div>
        </div>
      </Card>

      <div className={getStartedCard}>
        <Card color="green" shadow onlyWrap>
          <AccentText color="text-green">
            Create your own zkNFT with SealCred.
          </AccentText>
          <Button colors="primary" small>
            Get started
          </Button>
        </Card>
      </div>
    </div>
  )
}
