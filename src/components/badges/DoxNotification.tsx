import { AccentText } from 'components/ui/Text'
import Button from 'components/ui/Button'
import HintCard from 'components/badges/HintCard'
import WalletStore from 'stores/WalletStore'

export default function ({ account }: { account: string }) {
  return (
    <HintCard
      text={
        <>
          <AccentText color="text-secondary">Hold up...</AccentText> this wallet
          has NFTs (It’s doxxed). You should make sure your anonymous wallet is
          connected first before creating badges. Unless you plan to build
          badges on this wallet.
        </>
      }
    >
      <Button
        small
        type="primary"
        onClick={() => {
          WalletStore.walletsToNotifiedOfBeingDoxxed[account] = true
        }}
      >
        I understand, show badges
      </Button>
    </HintCard>
  )
}
