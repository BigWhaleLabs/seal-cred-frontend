import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'
import Ledger from 'types/Ledger'
import getLedger from 'helpers/getLedger'
import streetCred from 'helpers/streetCred'

const getMintedContracts = async (allContracts: ERC721[], account: string) => {
  try {
    return Promise.all(
      await allContracts.filter(async (contract) =>
        Number(await contract.balanceOf(account))
      )
    )
  } catch (error) {
    return Promise.all([])
  }
}

async function getDerivativeContracts(account?: string) {
  if (!account) return []
  const ledger = await getLedger(streetCred)
  const derivativeContracts: ERC721[] = []

  ledger.forEach(({ derivativeContract }) =>
    derivativeContracts.push(derivativeContract)
  )

  return getMintedContracts(derivativeContracts, account)
}

function getOriginalContracts(ledger: Ledger, account?: string) {
  if (!account) return Promise.resolve([])
  // const ledger = await getLedger(streetCred)
  const originalContracts: ERC721[] = []

  ledger.forEach(({ originalContract }) =>
    originalContracts.push(originalContract)
  )

  return getMintedContracts(originalContracts, account)
}

export { getOriginalContracts, getDerivativeContracts }
