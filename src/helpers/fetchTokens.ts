import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'
import Ledger from 'types/Ledger'
import getLedger from 'helpers/getLedger'
import streetCred from 'helpers/streetCred'

async function getDerivativeContracts() {
  return await []
}

async function isTokenOwner(contract: ERC721, account: string) {
  return !!Number(await contract.balanceOf(account))
}

function getFilteredContracts(
  allContracts: SCERC721Derivative[],
  account: string,
  minted = true
) {
  try {
    return Promise.all(
      allContracts.filter(async (contract) =>
        minted
          ? await isTokenOwner(contract, account)
          : !(await isTokenOwner(contract, account))
      )
    )
  } catch (error) {
    return Promise.all([])
  }
}

export function getDerivativeUnmintedContracts(
  ledger: Ledger,
  account?: string
) {
  if (!account) return Promise.resolve([])
  const derivativeContracts: SCERC721Derivative[] = []

  ledger.forEach(({ derivativeContract }) =>
    derivativeContracts.push(derivativeContract)
  )

  return getFilteredContracts(derivativeContracts, account, false)
}

async function getOriginalContracts(account?: string) {
  if (!account) return []
  const ledger = await getLedger(streetCred)
  const listOfContracts: ERC721[] = []

  ledger.forEach(({ originalContract }) =>
    listOfContracts.push(originalContract)
  )

  return Promise.all(
    listOfContracts
      .map(async (contract) =>
        Number(await contract.balanceOf(account)) ? contract : undefined
      )
      .filter((v) => !!v) // Removes all undefined
  )
}

export { getOriginalContracts, getDerivativeContracts }
