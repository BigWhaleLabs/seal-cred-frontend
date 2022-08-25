import { ContractReceipt } from 'ethers'
import { DataKey } from 'models/DataKey'
import { PersistableStore } from '@big-whale-labs/stores'
import { Web3Provider } from '@ethersproject/providers'
import { proxy } from 'valtio'
import Proof from 'models/Proof'
import WalletStore from 'stores/WalletStore'
import dataShapeObject from 'helpers/contracts/dataShapeObject'
import env from 'helpers/env'
import handleError from 'helpers/handleError'

export class ProofStore extends PersistableStore {
  proofsCompleted: Proof[] = []
  dataKey: DataKey
  createBadge: (
    provider: Web3Provider,
    proof: Proof
  ) => Promise<ContractReceipt>

  constructor(
    dataKey: DataKey,
    createBadge: (
      provider: Web3Provider,
      proof: Proof
    ) => Promise<ContractReceipt>
  ) {
    super()
    this.dataKey = dataKey
    this.createBadge = createBadge
  }

  equalProof(a: Proof, b: Proof): boolean {
    return (
      a.original === b.original &&
      a.account === b.account &&
      a.dataType === b.dataType
    )
  }

  deleteProof(a: Proof) {
    this.proofsCompleted = this.proofsCompleted.filter(
      (b) => !this.equalProof(a, b)
    )
  }

  deleteIfUsed(error: unknown, proof: Proof) {
    if (
      proof &&
      error instanceof Error &&
      error.message.includes('This ZK proof has already been used')
    ) {
      this.deleteProof(proof)
    }
  }

  async mint(proof: Proof) {
    try {
      const provider = await WalletStore.createGSNProvider()
      const result = await this.createBadge(provider, proof)
      this.deleteProof(proof)
      return result
    } catch (error) {
      this.deleteIfUsed(error, proof)
      handleError(error)
      throw error
    }
  }
}

export default proxy(
  dataShapeObject((dataKey, { mint }) =>
    proxy(new ProofStore(dataKey, mint)).makePersistent(env.VITE_ENCRYPT_KEY)
  )
)
