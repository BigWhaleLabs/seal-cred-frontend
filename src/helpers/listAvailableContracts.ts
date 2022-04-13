import { ScledgerAbi__factory } from 'helpers/abiTypes/scLedgerAbi'
import PublicAccountStore, { Account } from 'stores/PublicAccountStore'

const listAvailableContracts = async (account: Account): Promise<string[]> => {
  const walletWithProvider = PublicAccountStore.getWalletWithProvider(account)

  if (!walletWithProvider) {
    console.error('Cannot connect to provider')
    return []
  }

  const contract = await ScledgerAbi__factory.connect(
    import.meta.env.VITE_SC_LEDGER_CONTRACT_ADDRESS as string,
    walletWithProvider
  )

  if (!contract) {
    console.error('Cannot connect to SC Ledger Contract')
    return []
  }

  return await contract.getAvailableContracts()
}

export default listAvailableContracts
