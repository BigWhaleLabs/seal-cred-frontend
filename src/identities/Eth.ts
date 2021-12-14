import Credentials from 'models/Credentials'
import Identity from 'models/Identity'
import axios from 'axios'

export default {
  name: 'ETH',
  type: 'eth' as const,
  async verify(credentials: Credentials) {
    const verificationResult = await axios.get<{
      eth: string
    }>(
      `${import.meta.env.VITE_DOSU_BACKEND}/access-token/eth?accessToken=${
        credentials.secret
      }`
    )
    return {
      identifier: verificationResult.data.eth,
    }
  },
  identifierTransformator(identifier: string) {
    return identifier
  },
} as Identity
