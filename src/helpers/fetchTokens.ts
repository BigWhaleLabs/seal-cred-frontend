import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'
import getLedger from 'helpers/getLedger'
import streetCred from 'helpers/streetCred'

async function getDerivativeContracts() {
  return await []
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
      .map(async (contract) => {
        return Number(await contract.balanceOf(account)) > 0
          ? contract
          : undefined
      })
      .filter((v) => !!v)
  )
}

export { getOriginalContracts, getDerivativeContracts }
