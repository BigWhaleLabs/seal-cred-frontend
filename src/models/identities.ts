import DosuIdentity from 'identities/Dosu'
import ETHIdentity from 'identities/Eth'
import Identity from 'models/Identity'
import IdentityType from 'models/IdentityType'

export default {
  dosu: DosuIdentity,
  eth: ETHIdentity,
} as { [K in IdentityType]: Identity }
