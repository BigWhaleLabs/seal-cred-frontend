import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'
import getLedger from 'helpers/getLedger'
import streetCred from 'helpers/streetCred'

async function getDerivativeContracts() {
  return await []
}

async function getOriginalContracts(account: string) {
  const ledger = await getLedger(streetCred)
  const listOfContracts = []
  const iterator = ledger.values()
  for (let index = 0; index < ledger.size; index++) {
    const { originalContract } = iterator.next().value
    listOfContracts.push(originalContract)
  }
  return Promise.all(
    listOfContracts
      .map(async (contract: ERC721) => {
        return Number(await contract.balanceOf(account)) > 0
          ? contract.name()
          : undefined
      })
      .filter((v) => !!v)
  )
}

export { getOriginalContracts, getDerivativeContracts }
