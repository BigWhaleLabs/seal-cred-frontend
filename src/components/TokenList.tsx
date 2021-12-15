import Token from 'models/Token'
import TokenType from 'models/TokenType'
import { classnames } from 'classnames/tailwind'
import Button from 'components/Button'
import { BadgeText } from 'components/Text'

export enum TokenActionType {
  accent = 'mint',
  error = 'unlink',
  success = 'link',
}
export interface ListData {
  tokens: (Token | TokenType)[]
  type: 'accent' | 'error' | 'success'
  action?: () => Promise<void>
}

const listWrapper = classnames('flex', 'justify-start', 'items-center', 'py-2')
const listTokenTitle = classnames('w-full', 'text-white')
const listTokenAction = classnames('justify-self-end')

export const TokenList = ({ tokens, type, action }: ListData) => {
  return tokens.map((token, index) => (
    <div className={listWrapper} key={index}>
      <div className={listTokenTitle}>
        <BadgeText>{typeof token === 'string' ? token : token.type}</BadgeText>
      </div>
      <div className={listTokenAction}>
        <Button type={type} badge onClick={action}>
          {TokenActionType[type]}
        </Button>
      </div>
    </div>
  ))
}

export default TokenList
