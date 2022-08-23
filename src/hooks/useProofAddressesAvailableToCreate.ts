import { useSnapshot } from 'valtio'
import Network from 'models/Network'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'
import useOwnedAddresses from 'hooks/useOwnedAddresses'

export default function (network?: Network) {
  const { eRC721ProofsCompleted } = useSnapshot(ProofStore)
  const { allDerivativeAddresses = [] } = useSnapshot(SealCredStore)

  const ownedAddresses = useOwnedAddresses(network)

  const completedERC721ProofAddressesMap = eRC721ProofsCompleted.reduce(
    (result, proof) => ({
      ...result,
      [proof.contract]: true,
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
