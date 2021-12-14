import Credentials from 'models/Credentials'
import IdentityType from 'models/IdentityType'
import VerificationResult from 'models/VerificationResult'

export default interface Identity {
  name: string
  type: IdentityType
  verify(credentials: Credentials): Promise<VerificationResult>
  identifierTransformator(identifier: string): string
}
