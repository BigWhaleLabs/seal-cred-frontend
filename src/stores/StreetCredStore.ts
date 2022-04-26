import { proxy } from 'valtio'
import ExtendedERC721Contract from 'helpers/extendedERC721'
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

streetCred.on(
  streetCred.filters.SetMerkleRoot(),
  async (tokenAddress, merkleRoot) => {
    const ledger = await StreetCredStore.ledger
    if (!ledger) return
    ledger[tokenAddress] = new ExtendedERC721Contract(tokenAddress, merkleRoot)
  }
)
streetCred.on(streetCred.filters.DeleteMerkleRoot(), async (tokenAddress) => {
  const ledger = await StreetCredStore.ledger
  if (!ledger) return
  delete ledger[tokenAddress]
})

export default StreetCredStore
