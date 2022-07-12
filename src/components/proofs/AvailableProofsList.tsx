import ContractListContainer from 'components/proofs/ContractListContainer'
import Network from 'models/Network'
import Proof from 'components/proofs/Proof'

export default function ({
  proofs,
  network,
}: {
  proofs: string[]
  network: Network
}) {
  return (
    <>
      {!!proofs.length && (
        <ContractListContainer>
          {proofs.map((address) => (
            <Proof contractAddress={address} key={address} network={network} />
          ))}
        </ContractListContainer>
      )}
    </>
  )
}
