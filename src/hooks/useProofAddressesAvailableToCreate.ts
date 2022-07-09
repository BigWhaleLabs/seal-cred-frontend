import {
  GoerliContractsStore,
  MainnetContractsStore,
} from 'stores/ContractsStore'
import { useSnapshot } from 'valtio'
import Network from 'models/Network'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'
import networkPick from 'helpers/networkPick'

export default function (network?: Network) {
  const { goerliERC721ProofsCompleted, mainnetERC721ProofsCompleted } =
    useSnapshot(ProofStore)
  let contractsOwned: readonly string[]
  switch (network) {
    case Network.Mainnet:
    case Network.Goerli: {
      const { contractsOwned: temp } = useSnapshot(
        networkPick(network, GoerliContractsStore, MainnetContractsStore)
      )
      contractsOwned = temp
      break
    }
    default: {
      const { contractsOwned: goerliContractsOwned } =
        useSnapshot(GoerliContractsStore)
      const { contractsOwned: mainnetContractsOwned } = useSnapshot(
        MainnetContractsStore
      )
      contractsOwned = [...goerliContractsOwned, ...mainnetContractsOwned]
    }
  }
  const { derivativeContracts = [] } = useSnapshot(SealCredStore)
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
