import { proxy } from 'valtio'
import Ledger from 'types/Ledger'
import getLedger from 'helpers/getLedger'
import streetCred from 'helpers/streetCred'

// TODO: use erc721abi to create a contract per every ledger contract
// TODO: we will need two methods on each of these contracts: `isAddressOwner(address: string): boolean` and `getListOfOwners(): string[]` — first to display in the "Supported NFTs that you own" section, second — to generate the merkle proofs for zk proofs
// TODO: make sure that erc721abi contracts are inserted/removed when the ledger is modified

type StreetCredStoreType = {
  ledger: Promise<Ledger | undefined>
}

const StreetCredStore = proxy<StreetCredStoreType>({
  ledger: getLedger(streetCred),
})

// TODO: make sure that the ledger is always up-to-date
streetCred.on(
  streetCred.filters.SetMerkleRoot(),
  (tokenAddress, merkleRoot) => {
    // StreetCredStore.ledger[tokenAddress] = merkleRoot
  }
)
streetCred.on(streetCred.filters.DeleteMerkleRoot(), (tokenAddress) => {
  // delete StreetCredStore.ledger[tokenAddress]
})

export default StreetCredStore
