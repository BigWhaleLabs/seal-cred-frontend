import { BadgeText, SubBadgeText } from 'components/Text'
import { FC, useEffect, useState } from 'react'
import {
  alignItems,
  classnames,
  display,
  flexDirection,
  justifyContent,
  justifySelf,
  padding,
  space,
  textColor,
  width,
} from 'classnames/tailwind'
import Button from 'components/Button'
import ConnectedIdentity from 'models/ConnectedIdentity'
import EthStore from 'stores/EthStore'
import PublicAccountStore from 'stores/PublicAccountStore'
import Token from 'models/Token'
import TokenType from 'models/TokenType'
import callProof from 'helpers/callProof'
import createEcdsaInput from 'helpers/createEcdsaInput'
import createTreeProof from 'helpers/createTreeProof'
import titleForToken from 'helpers/titleForToken'
import { useSnapshot } from 'valtio'

type ButtonType = 'minted' | 'unminted' | 'linked'

interface TokenListProps {
  connectedIdentity: ConnectedIdentity
  tokens: (Token | TokenType)[]
  type: ButtonType
  fetchTokens: () => Promise<void>
}

const listWrapper = classnames(
  display('flex'),
  justifyContent('justify-start'),
  alignItems('items-center'),
  padding('py-2')
)
const listTokenTitle = classnames(
  display('flex'),
  flexDirection('flex-col'),
  width('w-full'),
  textColor('text-white')
)
const listTokenAction = classnames(
  justifySelf('justify-self-end'),
  display('flex'),
  alignItems('items-center'),
  flexDirection('flex-row'),
  space('space-x-2')
)

enum LoadingStage {
  sign = 'Signing message',
  ecdsa = 'Generating ecdsa inputs',
  proof = 'Generating the merkletree proof inputs',
  output = 'Generating the proof outputs',
  mint = 'Minting the nft',
  clear = '',
}

function colorForType(type: ButtonType) {
  switch (type) {
    case 'minted':
      return 'accent'
    case 'unminted':
      return 'success'
    case 'linked':
      return 'error'
  }
}

const TokenComponent: FC<TokenListProps & { token: Token | TokenType }> = ({
  token,
  type,
  connectedIdentity,
}) => {
  const { publicBadges } = useSnapshot(PublicAccountStore)
  const [loadingMint, setLoadingMint] = useState(false)
  const [loadingStage, setLoadingStage] = useState<LoadingStage>(
    LoadingStage.clear
  )
  const [minted, setMinted] = useState(false)

  useEffect(() => {
    async function checkMinted() {
      const result = await EthStore.checkAddressForMint(
        connectedIdentity.identifier
      )
      setMinted(result || false)
      if (result) {
        const type =
          connectedIdentity.type === 'dosu'
            ? TokenType.dosuHandle
            : TokenType.dosu1wave
        const badge = publicBadges.find(
          (i) => i.extraPublicIdentifier === connectedIdentity.identifier
        )
        if (!badge) {
          PublicAccountStore.setBadges({
            type,
            identityType: connectedIdentity.type,
            extraPublicIdentifier: connectedIdentity.identifier,
          })
        }
      }
    }

    void checkMinted()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={listTokenTitle}>
        <BadgeText>{titleForToken(token, connectedIdentity)}</BadgeText>
        {loadingStage && <SubBadgeText>{loadingStage}</SubBadgeText>}
      </div>
      {!minted ? (
        <div className={listTokenAction}>
          <Button
            color={colorForType(type)}
            loading={loadingMint}
            onClick={async () => {
              setLoadingMint(true)
              try {
                setLoadingStage(LoadingStage.sign)
                const signature = await EthStore.signMessage(
                  PublicAccountStore.mainEthWallet.address
                )
                console.log(signature)

                setLoadingStage(LoadingStage.proof)
                const proof = await createTreeProof()
                console.log(proof)

                setLoadingStage(LoadingStage.ecdsa)
                const ecdsaInput = await createEcdsaInput()
                console.log(ecdsaInput)

                setLoadingStage(LoadingStage.output)
                const resp = await callProof(proof, ecdsaInput)
                console.log(resp)

                setLoadingStage(LoadingStage.mint)
                const txResult = await EthStore.mintDerivative()
                console.log(txResult)

                setMinted(true)
              } catch (e) {
                console.error('Get error: ', e)
              } finally {
                setLoadingStage(LoadingStage.clear)
                setLoadingMint(false)
              }
            }}
            disabled={!!EthStore.ethError}
            badge
          >
            Mint
          </Button>
        </div>
      ) : null}
    </>
  )
}

export const TokenList: FC<TokenListProps> = ({ tokens, ...rest }) => {
  return (
    <>
      {tokens.map((token: Token | TokenType, index: number) => (
        <div className={listWrapper} key={index}>
          <TokenComponent tokens={tokens} {...rest} token={token} />
        </div>
      ))}
    </>
  )
}

export default TokenList
