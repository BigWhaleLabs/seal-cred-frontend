import { HintText } from 'components/Text'
import ContractListContainer from 'components/proofs/ContractListContainer'
import HintCard from 'components/badges/HintCard'
import Network from 'models/Network'
import Proof from 'components/proofs/Proof'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

export default function ({ network }: { network: Network }) {
  const proofs = useProofAddressesAvailableToCreate(network)

  return (
    <>
      {proofs.length ? (
        <ContractListContainer>
          {proofs.map((address) => (
            <Proof contractAddress={address} key={address} network={network} />
          ))}
        </ContractListContainer>
      ) : (
        <HintCard small>
          <HintText bold center>
            No NFTs to proof
          </HintText>
        </HintCard>
      )}
    </>
  )
}
