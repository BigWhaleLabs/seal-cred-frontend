import { AccentText } from 'components/Text'
import Button from 'components/Button'
import HintCard from 'components/badges/HintCard'
import Title from 'components/Title'
import WalletStore from 'stores/WalletStore'

export default function () {
  return (
    <>
      <Title
        titleColor="secondary"
        title="Then"
        subtitle="Once you’ve created a ZK proof, you will be able to mint ZK badges for your anonymous wallets"
      />
      <HintCard>
        <p>
          <AccentText color="text-secondary">1.</AccentText> Create proof with
          any NFTs in your wallet.
        </p>
        <p>
          <AccentText color="text-secondary">2.</AccentText> Create or use a new
          wallet (anonymous wallet) and connect to SealCred again.
        </p>
        <p>
          <AccentText color="text-secondary">3.</AccentText> Mint badges using
          the anonymous wallet.
        </p>
        <Button
          type="tertiary"
          withArrow
          onClick={async () => {
            await WalletStore.connect(true)
          }}
        >
          Connect your anonymous wallet
        </Button>
      </HintCard>
    </>
  )
}
