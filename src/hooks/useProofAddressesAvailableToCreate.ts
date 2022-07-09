import {
  GoerliContractsStore,
  MainnetContractsStore,
} from 'stores/ContractsStore'
import { useSnapshot } from 'valtio'
import Network from 'models/Network'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'

export default function (network?: Network) {
  const { goerliERC721ProofsCompleted, mainnetERC721ProofsCompleted } =
    useSnapshot(ProofStore)
  let contractsOwned: readonly string[]
  switch (network) {
    case Network.Mainnet: {
      const { contractsOwned: temp } = useSnapshot(MainnetContractsStore)
      contractsOwned = temp
      break
    }
    case Network.Goerli: {
      const { contractsOwned: temp } = useSnapshot(GoerliContractsStore)
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
