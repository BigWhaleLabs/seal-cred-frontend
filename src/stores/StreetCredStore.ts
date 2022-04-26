import { proxy } from 'valtio'
import ExtendedERC721Contract from 'helpers/ExtendedERC721Contract'
import Ledger from 'types/Ledger'
import getLedger from 'helpers/getLedger'
import streetCred from 'helpers/streetCred'

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
