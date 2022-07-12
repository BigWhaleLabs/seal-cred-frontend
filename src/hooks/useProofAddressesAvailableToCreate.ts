import {
  GoerliContractsStore,
  MainnetContractsStore,
} from 'stores/ContractsStore'
import { useSnapshot } from 'valtio'
import Network from 'models/Network'
import ProofStore from 'stores/ProofStore'
import networkPick from 'helpers/networkPick'
import useContractsOwned from 'hooks/useContractsOwned'
import useDerivativesContracts from 'hooks/useDerivativesContracts'

export default function (network?: Network) {
  const { goerliERC721ProofsCompleted, mainnetERC721ProofsCompleted } =
    useSnapshot(ProofStore)
  let contractsOwned: readonly string[]
  switch (network) {
    case Network.Mainnet:
    case Network.Goerli: {
      contractsOwned = useContractsOwned(
        networkPick(network, GoerliContractsStore, MainnetContractsStore)
      )
      break
    }
    default: {
      const goerliContractsOwned = useContractsOwned(GoerliContractsStore)
      const mainnetContractsOwned = useContractsOwned(MainnetContractsStore)
      contractsOwned = [...goerliContractsOwned, ...mainnetContractsOwned]
    }
  }
  const derivativeContracts = useDerivativesContracts()

  const completedERC721ProofAddressesMap = [
    ...goerliERC721ProofsCompleted,
    ...mainnetERC721ProofsCompleted,
  ].reduce(
    (result, proof) => ({
      ...result,
      [proof.contract]: true,
    }),
    {} as { [address: string]: boolean }
  )
  return (
    contractsOwned.filter(
      (address) =>
        !derivativeContracts.includes(address) &&
        !completedERC721ProofAddressesMap[address]
    ) || []
  )
}
