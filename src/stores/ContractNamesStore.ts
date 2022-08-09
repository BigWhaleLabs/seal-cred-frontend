import { ContractNamesStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import env from 'helpers/env'

export default proxy(new ContractNamesStore()).makePersistent(
  true,
  env.VITE_ENCRYPT_KEY
)
