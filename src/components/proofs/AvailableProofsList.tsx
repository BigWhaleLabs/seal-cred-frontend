import ContractListContainer from 'components/proofs/ContractListContainer'
import Proof from 'components/proofs/Proof'

export default function ({ proofs }: { proofs: string[] }) {
  return (
    <>
      {!!proofs.length && (
        <ContractListContainer>
          {proofs.map((address) => (
            <Proof contractAddress={address} key={address} />
          ))}
        </ContractListContainer>
      )}
    </>
  )
}
