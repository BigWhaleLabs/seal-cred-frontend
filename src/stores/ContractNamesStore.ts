import { ContractNamesStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import env from 'helpers/env'

const disallowedNames = ['requestedNames', 'contractNames']

export default proxy(new ContractNamesStore(disallowedNames)).makePersistent(
  true,
  env.VITE_ENCRYPT_KEY
)
