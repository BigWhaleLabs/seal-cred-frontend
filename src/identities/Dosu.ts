import Credentials from 'models/Credentials'
import Identity from 'models/Identity'
import axios from 'axios'

export default {
  name: 'Dosu',
  type: 'dosu' as const,
  async verify(credentials: Credentials) {
    const verificationResult = await axios.get<{
      handle: string
    }>(
      `${import.meta.env.VITE_DOSU_BACKEND}/access-token/user?accessToken=${
        credentials.secret
      }`
    )
    return {
      identifier: verificationResult.data.handle,
    }
  },
  identifierTransformator(identifier: string) {
    return `@${identifier}`
  },
} as Identity
