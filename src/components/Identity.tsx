import { BodyText, LargerText } from 'components/Text'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'components/Card'
import ConnectedIdentity from 'models/ConnectedIdentity'
import FetchingData from 'components/FetchingData'
import IdentityType from 'models/IdentityType'
import PublicAccountStore from 'stores/PublicAccountStore'
import identities from 'models/identities'
import useQuery from 'helpers/useQuery'

export interface IdentityProps {
  connectingIdentityType?: IdentityType
  connectedIdentity?: ConnectedIdentity
}

const IdentityComponent: FC<IdentityProps> = ({
  connectedIdentity,
  connectingIdentityType,
}) => {
  const identityType = connectedIdentity?.type || connectingIdentityType
  const query = useQuery()
  const accessToken = query.get('access_token')
  const navigate = useNavigate()

  if (!identityType) {
    return null
  }

  const identity = identities[identityType]

  useEffect(() => {
    if (!connectingIdentityType || !accessToken) {
      return
    }
    const verifyIdentity = async () => {
      const { identifier } = await identity.verify({ accessToken })
      if (
        !PublicAccountStore.connectedIdentities.find(
          (identity) =>
            identity.type === connectingIdentityType &&
            identity.identifier === identifier
        )
      ) {
        PublicAccountStore.connectedIdentities.unshift({
          type: identityType,
          name: identity.name,
          identifier,
          secret: accessToken,
        })
      }
      navigate('/')
    }
    void verifyIdentity()
  }, [connectingIdentityType, accessToken, identity, identityType, navigate])

  return (
    <Card>
      <BodyText>{identity.name}</BodyText>
      {!connectedIdentity && <FetchingData />}
      {connectedIdentity && (
        <>
          <LargerText>
            {identity.identifierTransformator(connectedIdentity.identifier)}
          </LargerText>
        </>
      )}
    </Card>
  )
}

export default IdentityComponent
