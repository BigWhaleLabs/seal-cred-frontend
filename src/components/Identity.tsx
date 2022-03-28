import { BodyText, LargerText } from 'components/Text'
import { FC, Suspense, useEffect, useState } from 'react'
import { classnames, wordBreak } from 'classnames/tailwind'
import { useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import Card from 'components/Card'
import ConnectedIdentity from 'models/ConnectedIdentity'
import FetchingData from 'components/FetchingData'
import IdentityType from 'models/IdentityType'
import PublicAccountStore from 'stores/PublicAccountStore'
import Tokens from 'components/Tokens'
import TokensStore from 'stores/TokensStore'
import identities from 'models/identities'
import useQuery from 'hooks/useQuery'

interface IdentityProps {
  connectingIdentityType?: IdentityType
  connectedIdentity?: ConnectedIdentity
}
const breakWords = classnames(wordBreak('break-words'))
const IdentityComponent: FC<IdentityProps> = ({
  connectedIdentity,
  connectingIdentityType,
}) => {
  const identityType = connectedIdentity?.type || connectingIdentityType
  const query = useQuery()
  const accessToken = query.get('access_token')
  const navigate = useNavigate()
  const [isConnected, setConnected] = useState(false)
  const [connectedError, setConnectedError] = useState(false)

  if (!identityType) {
    return null
  }

  useEffect(() => {
    if (connectedIdentity) {
      TokensStore.updateToken(connectedIdentity.type, connectedIdentity.secret)
    }
  })

  const identity = identities[identityType]

  useEffect(() => {
    if (!connectingIdentityType || !accessToken) {
      return
    }
    const verifyIdentity = async () => {
      if (!identity.verify) {
        return
      }
      setConnectedError(false)
      try {
        const { identifier } = await identity.verify({ secret: accessToken })
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
          navigate('/')
        } else {
          setConnected(true)
        }
      } catch (error) {
        console.error('Verify error:', error)
        setConnectedError(true)
      }
    }
    void verifyIdentity()
  }, [connectingIdentityType, accessToken, identity, identityType, navigate])

  const FetchingHandlerScreen = () => {
    return connectedError ? (
      <>
        <BodyText>
          Your access token is invalid. Please, make sure it is correct
        </BodyText>
        <Button color="error" onClick={() => navigate('/')}>
          Ok
        </Button>
      </>
    ) : (
      <FetchingData />
    )
  }

  if (isConnected) return null

  return (
    <Card>
      <BodyText>{identity.name}</BodyText>
      {!connectedIdentity && <FetchingHandlerScreen />}
      {connectedIdentity && (
        <div className={breakWords}>
          <LargerText>
            {identity.identifierTransformator?.(connectedIdentity.identifier) ||
              connectedIdentity.identifier}
          </LargerText>
        </div>
      )}
      {connectedIdentity && (
        <Suspense fallback={<FetchingData text={'Fetching Token ...'} />}>
          <Tokens connectedIdentity={connectedIdentity} />
        </Suspense>
      )}
    </Card>
  )
}

export default IdentityComponent
