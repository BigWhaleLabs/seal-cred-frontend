import { ContractMetadataStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import env from 'helpers/env'

export default proxy(new ContractMetadataStore()).makePersistent(
  env.VITE_ENCRYPT_KEY
)
