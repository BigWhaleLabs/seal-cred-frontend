import {
  ERC721__factory,
  SCERC721Derivative__factory,
} from '@big-whale-labs/seal-cred-ledger-contract'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ContractSynchronizer, {
  ContractSynchronizerSchema,
} from 'helpers/ContractSynchronizer'
import PersistableStore from 'stores/persistence/PersistableStore'
import WalletStore from 'stores/WalletStore'
import defaultProvider from 'helpers/defaultProvider'

class ContractsStore extends PersistableStore {
  connectedAccounts: { [account: string]: ContractSynchronizer } = {}
  contractsOwned: string[] | undefined
  originalsContractsOwned: string[] | undefined
  derivativesContractsOwned: string[] | undefined

  replacer = (key: string, value: unknown) => {
    const disallowList = ['connectedAccounts']
    return disallowList.includes(key) ? undefined : value
  }

  reviver = (key: string, value: unknown) => {
    if (key === 'connectedAccounts') {
      return Object.entries(
        value as { [account: string]: ContractSynchronizerSchema }
      ).reduce(
        (result, [account, state]) => ({
          ...result,
          [account]: ContractSynchronizer.fromJSON(state),
        }),
        {}
      )
    }
    return value
  }

  async fetchMoreContractsOwned(blockNumber?: number) {
    if (!WalletStore.account) {
      this.contractsOwned = []
      this.originalsContractsOwned = []
      this.derivativesContractsOwned = []
      return
    }

    if (!this.connectedAccounts[WalletStore.account])
      this.connectedAccounts[WalletStore.account] = new ContractSynchronizer(
        WalletStore.account
      )

    this.contractsOwned = await this.connectedAccounts[
      WalletStore.account
    ].getOwnedERC721(blockNumber)

    const { derivatives, originals } = await splitContracts(this.contractsOwned)

    this.originalsContractsOwned = originals
    this.derivativesContractsOwned = derivatives
  }
}

const contractsStore = proxy(new ContractsStore()).makePersistent()

async function splitContracts(addresses: string[]) {
  const records = await Promise.all(
    addresses.map(async (address) => {
      const contract = SCERC721Derivative__factory.connect(
        address,
        defaultProvider
      )
      const attestorPublicKey = await contract.callStatic
        .attestorPublicKey()
        .catch(() => undefined)
      return typeof attestorPublicKey === 'undefined'
        ? { contract: ERC721__factory.connect(address, defaultProvider) }
        : { contract, isDerivative: true }
    })
  )

  return {
    originals: records
      .filter(({ isDerivative }) => !isDerivative)
      .map(({ contract }) => contract.address),
    derivatives: records
      .filter(({ isDerivative }) => isDerivative)
      .map(({ contract }) => contract.address),
  }
}

subscribeKey(WalletStore, 'account', () =>
  contractsStore.fetchMoreContractsOwned()
)

defaultProvider.on('block', (blockNumber: number) =>
  contractsStore.fetchMoreContractsOwned(blockNumber)
)

export default contractsStore
