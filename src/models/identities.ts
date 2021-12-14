import DosuIdentity from 'identities/Dosu'
import Identity from 'models/Identity'
import IdentityType from 'models/IdentityType'

export default {
  dosu: DosuIdentity,
} as { [K in IdentityType]: Identity }
