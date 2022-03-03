import { WalletLinkProvider } from 'walletlink'
declare global {
  interface Window {
    ethereum: WalletLinkProvider
  }
}
