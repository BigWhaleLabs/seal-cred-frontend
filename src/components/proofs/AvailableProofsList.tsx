import { DataKeys } from 'models/DataKeys'
import ContractListContainer from 'components/proofs/ContractListContainer'
import Proof from 'components/proofs/Proof'

export default function ({
  proofs,
  dataKey,
}: {
  proofs: string[]
  dataKey: DataKeys
}) {
  if (proofs.length === 0) return null
  return (
    <ContractListContainer>
      {proofs.map((address) => (
        <Proof dataKey={dataKey} contractAddress={address} key={address} />
      ))}
    </ContractListContainer>
  )
}
