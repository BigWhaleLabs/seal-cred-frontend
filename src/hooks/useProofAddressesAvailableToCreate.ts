import { useSnapshot } from 'valtio'
import ContractsStore from 'stores/ContractsStore'
import Network from 'models/Network'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'
import useAllContractsOwned from 'hooks/useAllContractsOwned'
import useContractsOwned from 'hooks/useContractsOwned'

export default function (network?: Network) {
  const { eRC721ProofsCompleted } = useSnapshot(ProofStore)
  const { allDerivativeContracts = [] } = useSnapshot(SealCredStore)

  let contractsOwned: readonly string[]
  switch (network) {
    case Network.Mainnet:
    case Network.Goerli: {
      contractsOwned = useContractsOwned(ContractsStore.networks[network])
      break
    }
    default: {
      contractsOwned = useAllContractsOwned()
    }
  }

  const completedERC721ProofAddressesMap = eRC721ProofsCompleted.reduce(
    (result, proof) => ({
      ...result,
      [proof.contract]: true,
    }),
    {} as { [address: string]: boolean }
  )

  return (
    contractsOwned.filter(
      (address) =>
        !allDerivativeContracts.includes(address) &&
        !completedERC721ProofAddressesMap[address]
    ) || []
  )
}
