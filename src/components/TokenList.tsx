import { BadgeText, SubBadgeText } from 'components/Text'
import { FC, useState } from 'react'
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
import createEcdsaInput from 'helpers/createEcdsaInput'
import createTreeProof from 'helpers/createTreeProof'
import titleForToken from 'helpers/titleForToken'

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
  input = 'Generating the inputs',
  ecdsa = 'Generating ecdsa inputs',
  proof = 'Generating the proof',
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
  const [loadingMint, setLoadingMint] = useState(false)
  const [loadingStage, setLoadingStage] = useState<LoadingStage>(
    LoadingStage.clear
  )

  return (
    <>
      <div className={listTokenTitle}>
        <BadgeText>{titleForToken(token, connectedIdentity)}</BadgeText>
        {loadingStage && <SubBadgeText>{loadingStage}</SubBadgeText>}
      </div>
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
            } catch (e) {
              console.error('Get error: ', e)
            } finally {
              setLoadingStage(LoadingStage.clear)
              setLoadingMint(false)
            }
          }}
          badge
        >
          Mint
        </Button>
      </div>
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
