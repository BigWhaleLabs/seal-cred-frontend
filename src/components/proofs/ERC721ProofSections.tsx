import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import AvailableProofsList from 'components/proofs/AvailableProofsList'
import Network from 'models/Network'
import ReadyERC721ProofsList from 'components/proofs/ReadyERC721ProofsList'
import Section from 'components/Section'
import WalletStore from 'stores/WalletStore'

export default function () {
  const { account } = useSnapshot(WalletStore)

  return (
    <>
      {Object.values(Network).map((network) => (
        <Section title={<BodyText>{network} NFTs</BodyText>}>
          <ReadyERC721ProofsList network={network} />
          {account && <AvailableProofsList network={network} />}
        </Section>
      ))}
    </>
  )
}
