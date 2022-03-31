import { useParams } from 'react-router-dom'
import IdentityType from 'models/IdentityType'

export default function useConnectingIdentityType() {
  const { connectingIdentityType } = useParams<{
    connectingIdentityType: IdentityType
  }>()
  return connectingIdentityType
}
