import { ScledgerAbi__factory } from 'helpers/abiTypes/scLedgerAbi'
import { Wallet, providers } from 'ethers'
import PublicAccountStore from 'stores/PublicAccountStore'

const listAvailableContracts = async (): Promise<string[]> => {
  const provider = new providers.InfuraProvider(
    import.meta.env.VITE_ETH_NETWORK as string,
    import.meta.env.VITE_INFURA_ID as string
  )

  const walletWithProvider = new Wallet(
    PublicAccountStore.mainEthWallet.privateKey,
    provider
  )

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
