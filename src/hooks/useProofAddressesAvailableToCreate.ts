import { useSnapshot } from 'valtio'
import Network from 'models/Network'
import Proof from 'models/Proof'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'
import useOwnedAddresses from 'hooks/useOwnedAddresses'

export default function (network?: Network) {
  const stores = useSnapshot(ProofStore)
  const { allDerivativeAddresses = [] } = useSnapshot(SealCredStore)

  const ownedAddresses = useOwnedAddresses(network)

  const completedERC721ProofAddressesMap = Object.values(stores)
    .reduce(
      (chain, proofs) => chain.concat(proofs.proofsCompleted),
      [] as Proof[]
    )
    .reduce(
      (result, proof) => ({
        ...result,
        [proof.original]: true,
      }),
      {} as { [address: string]: boolean }
    )

  return (
    ownedAddresses.filter(
      (address) =>
        !allDerivativeAddresses.includes(address) &&
        !completedERC721ProofAddressesMap[address]
    ) || []
  )
}
