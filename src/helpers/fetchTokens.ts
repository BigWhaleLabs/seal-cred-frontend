import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'
import getLedger from 'helpers/getLedger'
import streetCred from 'helpers/streetCred'

export async function getOriginalContracts() {
  const ledger = await getLedger(streetCred)
  const listOfContracts: ERC721[] = []

  ledger.forEach(({ originalContract }) =>
    listOfContracts.push(originalContract)
  )

  return listOfContracts
}

export async function getDerivativesContracts() {
  const ledger = await getLedger(streetCred)
  const listOfContracts: SCERC721Derivative[] = []

  ledger.forEach(({ derivativeContract }) =>
    listOfContracts.push(derivativeContract)
  )

  return listOfContracts
}

export async function checkContractBalance(account: string, contract: ERC721) {
  return !!Number(await contract.balanceOf(account))
}

async function getOriginalUnmintedContracts(account?: string) {
  if (!account) return []

  const listOfContracts = await getOriginalContracts()

  return Promise.all(
    listOfContracts
      .map(async (contract) =>
        (await checkContractBalance(account, contract)) ? undefined : contract
      )
      .filter((v) => !!v)
  )
}

async function getOriginalOwnedContracts(account?: string) {
  if (!account) return []

  const listOfContracts = await getOriginalContracts()

  return Promise.all(
    listOfContracts
      .map(async (contract) =>
        (await checkContractBalance(account, contract)) ? contract : undefined
      )
      .filter((v) => !!v) // Removes all undefined
  )
}

export {
  getOriginalOwnedContracts,
  getOriginalUnmintedContracts,
  getOriginalContracts as getDerivativeContracts,
}
