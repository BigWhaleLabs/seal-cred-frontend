import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'
import getLedger from 'helpers/getLedger'
import streetCred from 'helpers/streetCred'

const getMintedContracts = (allContracts: ERC721[], account: string) => {
  return allContracts
    .map(async (contract) =>
      Number(await contract.balanceOf(account)) > 0 ? contract : undefined
    ) // Gets all contracts that have tokens minted by the account
    .filter((v) => !!v) // Removes all undefined
}

async function getDerivativeContracts(account?: string) {
  if (!account) return []
  const ledger = await getLedger(streetCred)
  const derivativeContracts: ERC721[] = []

  ledger.forEach(({ derivativeContract }) =>
    derivativeContracts.push(derivativeContract)
  )

  return Promise.all(getMintedContracts(derivativeContracts, account))
}

async function getOriginalContracts(account?: string) {
  if (!account) return []
  const ledger = await getLedger(streetCred)
  const originalContracts: ERC721[] = []

  ledger.forEach(({ originalContract }) =>
    originalContracts.push(originalContract)
  )

  return Promise.all(getMintedContracts(originalContracts, account))
}

export { getOriginalContracts, getDerivativeContracts }
