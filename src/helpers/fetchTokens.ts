import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'
import getLedger from 'helpers/getLedger'
import streetCred from 'helpers/streetCred'

export default async function getOwnedOriginalTokens(account?: string) {
  if (!account) return []

  const ledger = await getLedger(streetCred)
  const contractOwned: ERC721[] = []

  ledger.forEach(async ({ originalContract }) => {
    const owned = Number(await originalContract.balanceOf(account))
    if (!owned) return

    contractOwned.push(originalContract)
  })

  return contractOwned
}
