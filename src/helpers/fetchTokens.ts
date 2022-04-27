import WalletStore from 'stores/WalletStore'
import getLedger from 'helpers/getLedger'
import streetCred from 'helpers/streetCred'

export default async function fetchOwnedTokens() {
  const ledger = await getLedger(streetCred)
  const tokensOwned: string[] = []

  ledger.forEach(async ({ originalContract }) => {
    if (!WalletStore.account) return

    const owned = Number(await originalContract.balanceOf(WalletStore.account))
    if (!owned) return

    const tokenName = await originalContract.name()
    tokensOwned.push(tokenName)
  })

  return tokensOwned
}
